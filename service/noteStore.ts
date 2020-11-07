import Datastore from 'nedb-promises';
import {Note} from './Note'

class NoteStore {
    private db:Datastore;

    constructor(db?)
    {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async create(note)
    {
        return await this.db.insert(note);
    }

    async update(id, note)
    {
        return this.db.update({_id: id}, {$set: {...note}})
    }

    async updateDone(id, done)
    {
        return this.db.update({_id: id}, {$set: {done: done}})
    }

    async delete(id)
    {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async deleteAll()
    {
        return this.db.remove({}, {multi: true});
    }

    async get(id)
    {
        return await this.db.findOne({_id: id});
    }

    async getAll()
    {
        return await this.db.find({});
    }
}

export const noteStore = new NoteStore();