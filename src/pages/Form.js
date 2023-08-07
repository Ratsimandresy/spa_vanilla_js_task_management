import AbstractView from "./AbstractView.js";
import service from "../services/index.js";
import { navigateTo } from "../router/index.js";
import Toast from "../components/Toast.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Add task");
        this.isValid = false;

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
                <form id="task-form" name="add-task-form" action="" method="post">

                    <p>Task title</p>
                    <input type="text" placeholder="task title..." name="name" tabindex="1">
                    <span class="error name-error"></span>
                    
                    <p>Task description</p>
                    <textarea placeholder="task description..." name="description" tabindex="5" rows="20"></textarea>
                    <span class="error description-error"></span>

                    <button class="add" type="submit" name="submitButton">
                        Add
                    </button>
                    <button type="button" class="cancel">Cancel</button>
                </form>
            </div>
            <div class="toast_container"></div>
        </section>
        `;
    }

    async after_render() {
        try {
            const toast = new Toast(
                "",
                "check_circle",
                "Task successfully created ! you will be redirected"
            );
            const toast_container = document.querySelector(".toast_container");
            const form = document.forms["add-task-form"];
            const cancelButton = document.querySelector("button.cancel");
            const addButton = document.querySelector("button.add");

            if (toast_container && cancelButton && form && addButton) {
                toast_container.innerHTML = await toast.render();

                cancelButton.addEventListener("click", () => {
                    navigateTo("http://localhost:3000/dashboard");
                });
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
                        document.querySelector(
                            ".description-error"
                        ).style.display = "block";
                        e.preventDefault();
                        return false;
                    }

                    const newTask = {
                        ...this.task,
                        label: this.name.value,
                        description: this.description.value,
                        start_date: new Date().toISOString(),
                    };

                    this.isValid = true;

                    toast.activateToast(this.submitButton, 2500);

                    if (this.isValid) {
                        await service.add(newTask);
                    }

                    setTimeout(() => {
                        navigateTo("http://localhost:3000/dashboard");
                    }, 4000);
                };
            }
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }
}
