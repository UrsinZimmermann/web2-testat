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
            return this.db.update({ _id: id }, { $set: { done } });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findOne({ _id: id });
        });
    }
    getSortedByImportance(ascending, includeFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            const invertedAscending = ascending * -1;
            if (includeFinished)
                return this.db.find({}).sort({ importance: invertedAscending });
            return this.db.find({ done: { $ne: true } }).sort({ importance: invertedAscending });
        });
    }
    getSortedByCreationDate(ascending, includeFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            if (includeFinished)
                return this.db.find({}).sort({ creationDate: ascending });
            return this.db.find({ done: { $ne: true } }).sort({ creationDate: ascending });
        });
    }
    getSortedByDueDate(ascending, includeFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            if (includeFinished)
                return this.db.find({}).sort({ dueDate: ascending });
            return this.db.find({ done: { $ne: true } }).sort({ dueDate: ascending });
        });
    }
}
export const noteStore = new NoteStore();
