import AbstractView from "./AbstractView.js";
import service from "../services/index.js";
import { navigateTo } from "../router/index.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Add task");

        this.task = {
            label: "",
            description: "",
            start_date: "",
            end_date: "",
        };
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
                    <button type="button">
                        <i class="material-icons add-task">check_circle</i>
                    </button>
                </form>
            </div>
        </section>
        `;
    }

    async after_render() {
        try {
            const input = document.querySelector("#task-form input");
            const textarea = document.querySelector("#task-form textarea");
            const button = document.querySelector("#task-form button");

            input.addEventListener("change", (e) => {
                this.task = { ...this.task, label: e.target.value };
            });

            textarea.addEventListener("change", (e) => {
                this.task = { ...this.task, description: e.target.value };
            });

            button.addEventListener("click", async () => {
                const newTask = {
                    ...this.task,
                    start_date: new Date().toISOString(),
                };
                await service.add(newTask);
            });
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }
}
