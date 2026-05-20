import UserModel from "../models/user.model.js"
 const getCurrentUser=async (req,res)=>{
    try{
        const userId = req.userId
        const user = await UserModel.findbyId(userId)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json(user)

    }catch(error){
      console.log(error)
      return res.status(500).json({message:"Error fetching user "})
    }
}

export default getCurrentUser
