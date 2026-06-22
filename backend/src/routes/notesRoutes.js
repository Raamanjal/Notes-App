import express from "express"
import { createNote, getNotesById, deleteNotes, getAllNotes, updateNotes } from "../controllers/notesController.js";
import authmiddleware from "../middleware/Auth.js";
const router = express.Router();


router.get("/",authmiddleware,getAllNotes)

router.get("/:id",authmiddleware,getNotesById)

router.post("/",authmiddleware,createNote)

router.put("/:id",authmiddleware,updateNotes)

router.delete("/:id",authmiddleware,deleteNotes)

export default router;