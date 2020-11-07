import {noteStore} from '../service/noteStore.js'
import {Note} from "../service/Note.js";

export class NoteController {
    showIndex(req, res) {
        res.render("index");
    };

    createNote(req, res) {
        res.render("createNote");
    };

    async createNewNote(request, response) {
        let note = new Note(request.body.title, request.body.description, request.body.importance, request.body.until, request.body.done)

        await noteStore.create(note)
        response.redirect('/')
    }

    async showNote(req, res) {
        res.render("showorder", await noteStore.get(req.params.id));
    };

    async deleteNote(req, res) {
        res.render("showorder", await noteStore.delete(req.params.id));
    };

}

export const noteController = new NoteController();