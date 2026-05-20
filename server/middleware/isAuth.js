// import jwt from "jsonwebtoken"

// export const isAuth = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(400).json({ message: "Token is not found" });
//         }

//         let verification = jwt.verify(token, process.env.JWT_SECRET);

//         if (!verification) {
//             return res.status(400).json({ message: "invalid token" });
//         }

//         req.userId = verification.userId;

//         next();

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: `Authentication error ${error.message}` });
//     }
// }

import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {

    try {

        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({
                message: "Token is not found"
            })
        }

        let verification = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        if (!verification) {
            return res.status(400).json({
                message: "Invalid token"
            })
        }

        req.userId = verification.userId

        next()

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            message: `Authentication error ${error.message}`
        })

    }

}

export default isAuth