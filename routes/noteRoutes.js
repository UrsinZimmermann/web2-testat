import express from 'express';
import {noteController} from '../controller/noteController.js';
const router = express.Router();

router.get("/", noteController.showIndex.bind(noteController));
router.post("/", noteController.showIndex.bind(noteController));

router.get("/createNote", noteController.createNote.bind(noteController));
router.post("/createNote", noteController.createNewNote.bind(noteController));

router.get("/note/:id", noteController.showNote.bind(noteController));
router.post("/note/:id", noteController.editNote.bind(noteController));

export const noteRoutes = router;
