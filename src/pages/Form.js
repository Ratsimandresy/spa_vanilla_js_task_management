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

    validateFrom(task) {
        if (task.label.trim().length < 3) return true;
        if (task.description.trim().length < 3) return true;
        return false;
    }

    async render() {
        return `
        <section id="form-view" class="page__content">
             <div class="form__content">
                <div class="form__header">
                <i class="material-icons md-48">edit_calendar</i>
                    <h1>Create a Task</h1>
                </div>
                <form id="task-form" name="add-task-form" action="" method="post">

                    <label>Task name</label>
                    <input type="text" placeholder="Task title" name="name" tabindex="1">
                    <p class="error name-error"></p>
                    
                    <label>Task description</label>
                    <textarea placeholder="Task description" name="description" tabindex="5" rows="10"></textarea>
                    <p class="error description-error"></p>

                    <button class="add" type="submit" name="submit">
                        Add
                    </button>
                    <p class="success"></p>
                    <button type="button" class="cancel">Cancel</button>
                </form>
            </div>
        </section>
        `;
    }

    async after_render() {
        try {
            const form = document.forms["add-task-form"];
            const cancelButton = document.querySelector("button.cancel");

            cancelButton.addEventListener("click", () => {
                navigateTo("http://localhost:3000/dashboard");
            });

            let errors = document.querySelectorAll(".error");
            for (let error of errors) {
                error.style.display = "none";
            }

            document.querySelector(".success").innerHTML = "";

            form.onsubmit = async function (e) {
                e.preventDefault();
                if (this.name.value.trim() < 3) {
                    document.querySelector(".name-error").innerHTML =
                        "Please enter a valid title";
                    document.querySelector(".name-error").style.display =
                        "block";
                    e.preventDefault();
                    return false;
                }

                if (this.description.value.trim() < 3) {
                    document.querySelector(".description-error").innerHTML =
                        "Please enter a valid description";
                    document.querySelector(".description-error").style.display =
                        "block";
                    e.preventDefault();
                    return false;
                }

                const newTask = {
                    ...this.task,
                    label: this.name.value,
                    description: this.description.value,
                    start_date: new Date().toISOString(),
                };

                await service.add(newTask);
            };
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }
}
