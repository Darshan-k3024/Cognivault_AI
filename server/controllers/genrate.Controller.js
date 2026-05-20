// import Notes from "../models/notes.model.js"
// import UserModel from "../models/user.model.js"
// import { genrateGeminiResponce } from "../services/gemini.services.js"
// import { buildPrompt } from "../utils/PromptBuilder.js"

// export const generateNotes = async (req, res) => {
//     try {
//           const{topic,
//   classLevel,
//   examType,
//   revision,
//   includeDiagram,
//   includeChart}=req.body

//   if(!topic){
//     return res.status(400).json({message:"Topic is required"}) 
//  }

//   const user = await UserModel.findById(req.userId)

//   if(!user){
//     return res.status(400).json({messgae:"User is not found"})
//   }
  

//   if(user.credits < 10){
//     return res.status(403).json({message:"Insufficient credits"})
//   }

//   const prompt = buildPrompt({topic,
//   classLevel,
//   examType,
//   revision,
//   includeDiagram,
//   includeChart})

//   const aiResponse= await genrateGeminiResponce(prompt)
//   const notes = await Notes.create({
//     user:user._id,
//     topic,
//     classLevel,
//     examType,
//     revisionMode:revision,
//     includeChart,
//     includeDiagram,
//     content:aiResponse
//   })

//   user.credits-=10;

//   if(user.credits <=10)user.isCreditAvailable=false;

//   if(!Array.isArray(user.notes)){
//     user.notes=[]
//   }
//   user.notes.push(notes._id)

//   await  user.save();

//   return res.status(200).json({
//       data:aiResponse,
//       noteId:notes._id,
//       creditsLeft:user.credits
//   })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             error:"AI genration failed",
//             messgae:error.message
//         })
//     }
// }

import Notes from "../models/notes.model.js"
import UserModel from "../models/user.model.js"
import { genrateGeminiResponce } from "../services/gemini.services.js"
import { buildPrompt } from "../utils/PromptBuilder.js"

export const generateNotes = async (req, res) => {

    try {

        const {
            topic,
            classLevel,
            examType,
            revision,
            includeDiagram,
            includeChart
        } = req.body

        if (!topic) {
            return res.status(400).json({
                message: "Topic is required"
            })
        }

        const user = await UserModel.findById(req.userId)

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        if (user.credits < 10) {
            return res.status(403).json({
                message: "Insufficient credits"
            })
        }

        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revision,
            includeDiagram,
            includeChart
        })

        const aiResponse = await genrateGeminiResponce(prompt)

        const notes = await Notes.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode: revision,
            includeChart,
            includeDiagram,
            content: aiResponse
        })

        user.credits -= 10

        if (user.credits <= 10) {
            user.isCreditAvailable = false
        }

        if (!Array.isArray(user.notes)) {
            user.notes = []
        }

        user.notes.push(notes._id)

        await user.save()

        return res.status(200).json({
            data: aiResponse,
            noteId: notes._id,
            creditsLeft: user.credits
        })
         console.log(req.body)

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            error: "AI generation failed",
            message: error.message
        })

    }

}