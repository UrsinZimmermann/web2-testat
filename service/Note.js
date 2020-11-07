export class Note {
    constructor(title, description, importance, dueDate, done) {
        this.titel = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.creationDate = new Date();
        this.done = done;
    }
}
