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

    async createNewNote(request, response) {
        let note = new Note(request.body.title, request.body.description, request.body.importance, request.body.until, new Date(), false)
        await noteStore.create(note)
        await this.showIndex()
    }

    async showNote(req, res) {
        res.render("showorder", await noteStore.get(req.params.id));
    };
}

export const noteController = new NoteController();