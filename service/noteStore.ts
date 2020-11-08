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

    async updateDone(id: number, done: boolean) {
        return this.db.update({_id: id}, {$set:{done}})
    }

    async get(id: number) {
        return await this.db.findOne({_id: id});
    }

    async getSortedByImportance(ascending: boolean, includeFinished: boolean) {
        if (includeFinished)
            return this.db.find({}).sort({importance: ascending})

        return this.db.find({done: {$ne: true}}).sort({importance: ascending})
    }

    async getSortedByCreationDate(ascending: boolean, includeFinished: boolean) {
        if (includeFinished)
            return this.db.find({}).sort({creationDate: ascending})

        return this.db.find({done: {$ne: true}}).sort({creationDate: ascending})
    }

    async getSortedByDueDate(ascending: boolean, includeFinished: boolean) {
        if (includeFinished)
            return this.db.find({}).sort({dueDate: ascending})

        return this.db.find({done: {$ne: true}}).sort({dueDate: ascending})
    }
}

export const noteStore = new NoteStore();