// import express from "express"
// import  isAuth  from "../middleware/isAuth.js"
// import { genrateNotes } from "../controllers/genrate.Controller.js"


// const notesRouter =express.Router()

// notesRouter.get("/genrate-notes",isAuth,genrateNotes)

// export default notesRouter

import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateNotes } from "../controllers/genrate.Controller.js"
import { getmyNotes, getSingleById } from "../controllers/notesController.js"

const notesRouter = express.Router()

notesRouter.post("/generate-notes", isAuth, generateNotes)
notesRouter.get("/getnotes", isAuth, getmyNotes)
notesRouter.get("/:id", isAuth, getSingleById)

export default notesRouter