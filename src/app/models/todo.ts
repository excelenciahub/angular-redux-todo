export class Todo {
    id: number;
    name: string;
    completed: boolean;

    constructor(data) {
        this.id = data.id || '';
        this.name = data.name || '';
        this.completed = data.completed || false;
    }
}
