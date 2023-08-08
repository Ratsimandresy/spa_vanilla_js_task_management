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
                    <span class="success"></span>
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
            const errors = document.querySelectorAll(".error");

            if (toast_container && cancelButton && form && addButton) {
                toast_container.innerHTML = await toast.render();

                cancelButton.addEventListener("click", () => {
                    navigateTo("http://localhost:3000/dashboard");
                });
                form.onsubmit = async function (e) {
                    e.preventDefault();

                    const nameValue = this.name.value.trim();
                    const descriptionValue = this.description.value.trim();

                    const nameError = document.querySelector(".name-error");
                    const descriptionError =
                        document.querySelector(".description-error");

                    nameError.innerHTML = "";
                    nameError.style.display = "none";
                    descriptionError.innerHTML = "";
                    descriptionError.style.display = "none";

                    if (nameValue.length < 3) {
                        nameError.innerHTML = "Please enter a valid title";
                        nameError.style.display = "block";
                        return false;
                    }

                    if (descriptionValue.length < 3) {
                        descriptionError.innerHTML =
                            "Please enter a valid description";
                        descriptionError.style.display = "block";
                        return false;
                    }

                    const newTask = {
                        ...this.task,
                        label: nameValue,
                        description: descriptionValue,
                        start_date: new Date().toISOString(),
                    };

                    await service.add(newTask);

                    setTimeout(() => {
                        navigateTo("http://localhost:3000/dashboard");
                    }, 3000);
                };
                toast.activateToast(addButton, 2500);
            }
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }
}
