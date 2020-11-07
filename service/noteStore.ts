import Datastore from 'nedb-promises';
import {Note} from './Note'

class NoteStore {
    private db:Datastore;

    constructor(db?: Datastore)
    {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async create(note: Note)
    {
        return await this.db.insert(note);
    }

    async update(id: number, note: Note)
    {
        return this.db.update({_id: id}, {$set: {...note}})
    }

    async updateDone(id: number, done: boolean)
    {
        return this.db.update({_id: id}, {$set: {done: done}})
    }

    async delete(id: number)
    {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async deleteAll()
    {
        return this.db.remove({}, {multi: true});
    }

    async get(id: number)
    {
        return await this.db.findOne({_id: id});
    }

    async getAll()
    {
        return this.db.find({});
    }

    async getSortedByImportance(ascending: boolean, includeFinished: boolean)
    {
        if(includeFinished)
            return this.db.find({}).sort({_importance: ascending ? 1 : -1})

        return this.db.find({_finished: {$ne: true}}).sort({_importance: ascending ? 1 : -1})
    }

    async getSortedByCreationDate(ascending: boolean, includeFinished:boolean)
    {
        if(includeFinished)
            return this.db.find({}).sort({_creationDate: ascending ? 1 : -1})

        return this.db.find({_finished: {$ne: true}}).sort({_creationDate: ascending ? 1 : -1})
    }

    async getSortedByDueDate(ascending: boolean, includeFinished:boolean)
    {
        if(includeFinished)
            return this.db.find({}).sort({_dueDate: ascending ? 1 : -1})

        return this.db.find({_finished: {$ne: true}}).sort({_dueDate: ascending ? 1 : -1})
    }
}

export const noteStore = new NoteStore();