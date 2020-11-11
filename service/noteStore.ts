import Datastore from 'nedb-promises';
import {Note} from './Note'

class NoteStore {
    private db: Datastore;

    constructor(db?: Datastore) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async create(note: Note) {
        return await this.db.insert(note);
    }

    async update(id: number, note: Note) {
        return this.db.update({_id: id}, {$set: {...note}})
    }

    async get(id: string): Promise<Note> {
        return await this.db.findOne({_id: id});
    }

    async getSortedByImportance(ascending: number, includeFinished: boolean) {
        const invertedAscending = ascending * -1;

        if (includeFinished)
            return this.db.find({}).sort({importance: invertedAscending})

        return this.db.find({done: {$ne: true}}).sort({importance: invertedAscending})
    }

    async getSortedByCreationDate(ascending: number, includeFinished: boolean) {
        const invertedAscending = ascending * -1;

        if (includeFinished)
            return this.db.find({}).sort({creationDate: invertedAscending})

        return this.db.find({done: {$ne: true}}).sort({creationDate: invertedAscending})
    }

    async getSortedByDueDate(ascending: number, includeFinished: boolean) {
        if (includeFinished)
            return this.db.find({}).sort({dueDate: ascending})

        return this.db.find({done: {$ne: true}}).sort({dueDate: ascending})
    }
}

export const noteStore = new NoteStore();