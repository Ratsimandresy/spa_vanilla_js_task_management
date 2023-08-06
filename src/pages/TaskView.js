import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.taskId = params.id;
        this.setTitle("Task");
    }

    async render() {
        return `
            <h1>Single Task</h1>
            <p>You are viewing post #${this.taskId}.</p>
        `;
    }
}
