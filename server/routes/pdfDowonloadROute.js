import express from "express";
import isAuth from "../middleware/isAuth.js";
import { pdfDowonload } from "../controllers/pdfController.js";

const pdfRouter = express.Router()

pdfRouter.post("/genrate-pdf",isAuth,pdfDowonload)

export default pdfRouter