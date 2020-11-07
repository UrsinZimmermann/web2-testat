var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Datastore from 'nedb-promises';
class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
    }
    create(note) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.insert(note);
        });
    }
    update(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.update({ _id: id }, { $set: Object.assign({}, note) });
        });
    }
    updateDone(id, done) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.update({ _id: id }, { $set: { done: done } });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update({ _id: id }, { $set: { "state": "DELETED" } });
            return yield this.get(id);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.remove({}, { multi: true });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findOne({ _id: id });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.find({});
        });
    }
    getSortedByImportance(ascending, includeFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            if (includeFinished)
                return this.db.find({}).sort({ _importance: ascending ? 1 : -1 });
            return this.db.find({ _finished: { $ne: true } }).sort({ _importance: ascending ? 1 : -1 });
        });
    }
    getSortedByCreationDate(ascending, includeFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            if (includeFinished)
                return this.db.find({}).sort({ _creationDate: ascending ? 1 : -1 });
            return this.db.find({ _finished: { $ne: true } }).sort({ _creationDate: ascending ? 1 : -1 });
        });
    }
    getSortedByDueDate(ascending, includeFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            if (includeFinished)
                return this.db.find({}).sort({ _dueDate: ascending ? 1 : -1 });
            return this.db.find({ _finished: { $ne: true } }).sort({ _dueDate: ascending ? 1 : -1 });
        });
    }
}
export const noteStore = new NoteStore();
