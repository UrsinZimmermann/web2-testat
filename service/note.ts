export class Note {
    private titel: string;
    private description: string;
    private importance: number;
    private dueDate: Date;
    private creationDate: Date;
    private done: boolean;

    constructor(title: string, description: string, importance: number, dueDate: Date, done: boolean) {
        this.titel = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.creationDate = new Date();
        this.done = done;
    }
}