import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Add task");
    }

    async render() {
        return `
        <section id="form-view" class="page__content">
             <div class="form__content">
                <div class="form__header">
                <i class="material-icons md-48">edit_calendar</i>
                    <h1>Create a Task</h1>
                </div>
                <form id="task-form">
                    <input type="text" value="" placeholder="Task title" name="name" tabindex="1">
                    <textarea placeholder="Task description" name="Description" tabindex="5" rows="10"></textarea>
                    <button type="submit">
                        <i class="material-icons add-task">check_circle</i>
                    </button>
                </form>
            </div>
        </section>
        `;
    }

    async after_render() {

    }
}
