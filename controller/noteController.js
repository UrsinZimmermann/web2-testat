import {noteStore} from '../service/noteStore.js'
import {Note} from "../service/Note.js";
import {updateSession} from "../helpers/sessionHelper.js";

export class NoteController {
    async showIndex(req, res) {
        req.session = updateSession(req)

        if (req.session.sortedBy === "importance") {
            res.render("index", {
                "notes": await noteStore.getSortedByImportance(req.session.ascending, req.session.showFinished),
                "session": req.session
            });
        } else if (req.session.sortedBy === "dueDate") {
            res.render("index", {
                "notes": await noteStore.getSortedByDueDate(req.session.ascending, req.session.showFinished),
                "session": req.session
            });
        } else {
            res.render("index", {
                "notes": await noteStore.getSortedByCreationDate(req.session.ascending, req.session.showFinished),
                "session": req.session
            });
        }
    }

    async createNote(req, res) {
        res.render('createNote');
    };

    async showNote(req, res) {
        res.render('editNote', {
            "note": await noteStore.get(req.params.id)
        })
    }

    async editNote(req, res) {
        const note = await noteStore.get(req.params.id);
        const updateNote = new Note(req.body.title, req.body.description, req.body.importance, req.body.dueDate, note.creationDate, !!req.body.done)
        await noteStore.update(req.params.id, updateNote)
        res.redirect('/')
    }

    async createNewNote(req, res) {
        let note = new Note(req.body.title, req.body.description, req.body.importance, req.body.until, new Date(), false)
        await noteStore.create(note)
        res.redirect('/')
    }
}

export const noteController = new NoteController();