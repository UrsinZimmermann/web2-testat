export class Note {
    private title: string;
    private description: string;
    private importance: number;
    private dueDate: Date;
    private creationDate: Date;
    private done: boolean;

    constructor(title: string, description: string, importance: number, dueDate: Date, creationDate: Date, done: boolean) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.creationDate = creationDate;
        this.done = done;
    }
}