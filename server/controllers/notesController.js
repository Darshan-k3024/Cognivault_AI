import Notes from "../models/notes.model.js";

export const getmyNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.userId }).select("topic classlvel examTYpe revisionMode includeDiagram includeChart createdAt")
        return res.status(200).json(notes)
          if(!notes){
          return res.status(404).json({message:"Notes not found"})
      }
    } catch (error) {
        return res.status(500).json({ message: `getCurrentUser notes error ${error}` })
    }
}

export const getSingleById = async (req, res) => {
  try {
      const notes = await Notes.findOne({_id:req.params.id,user:req.userId})

      if(!notes){
          return res.status(404).json({message:"Notes not found"})
      }
      return res.status(200).json({
        content:notes.content,
        topic:notes.topic,
        createdAt: notes.createdAt
      })

  } catch (error) {
      return res.status(500).json({ message: `getCurrenSingle notes error ${error}` })
  } 
}