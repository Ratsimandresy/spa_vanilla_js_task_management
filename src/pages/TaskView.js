import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.taskId = params.id;
        this.setTitle("Task");
    }

    async render() {
        return `
            <section id="task-view" class="page__content">
                
            </section>
        `;
    }
}
