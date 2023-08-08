import AbstractView from "./AbstractView.js";
import service from "../services/index.js";
import Utils from "../utils/Utils.js";
import { navigateTo } from "../router/index.js";
import Toast from "../components/Toast.js";

const { formatDate } = Utils;

export default class extends AbstractView {
    task;
    dueDate;

    constructor(params) {
        super(params);
        this.taskId = decodeURIComponent(params.id);
        this.setTitle("Task");
    }

    getTask = async () => {
        return await service.getTask(this.taskId);
    };

    setDueDate = (date) => (this.dueDate = date);

    async render() {
        this.task = await this.getTask();

        const createdAt = formatDate(this.task.start_date);

        const dueAt = formatDate(this.task.end_date);

        const inputDateValue = () => {
            if (this.task.end_date) {
                return `value="${new Date(this.task.end_date)
                    .toISOString()
                    .substring(0, 10)}"`;
            }
            return `value=""`;
        };

        return `
            <section id="task-view" class="page__content">
                <div class="task__content">
                    <div class="inner_card header">
                        <div>
                            <h1>${this.task.label}</h1>
                        </div>
                    </div>
                    <div class="createdAt">
                        <small >
                            created at: ${createdAt}
                        </small>
                    </div>
                    <div class="inner_card border bg description">
                        <div class="task_description">
                            <i class="material-icons">description_outlined</i>
                            <p>Description:</p>
                        </div>
                        <small>${this.task.description}</small>
                    </div>
                    <div class="inner_card bg">
                        <div class="task_dueDate">
                            <i class="material-icons">schedule</i>
                            <p>Due date :</p><span>${dueAt}</span>
                        </div>
                            <input lang="fr-CA" id="due-date-input" type="date" ${inputDateValue()}/>
                            <i class="material-icons due-date">check_circle</i>
                         </div>
                </div>
                <div class="toast_container"></div>
            </section>
        `;
    }

    async after_render() {
        try {
            const toast = new Toast("", "edit", "Task Due Date updated", 2500);
            const toast_container = document.querySelector(
                "#task-view .toast_container"
            );
            const input = document.getElementById("due-date-input");
            const check = document.querySelector(".material-icons.due-date");
            if (input && check && toast_container) {
                toast_container.innerHTML = await toast.render();
                toast.activateToast(check, 3000);

                input.addEventListener("change", (e) => {
                    e.preventDefault();
                    this.setDueDate(e.target.value);
                });

                check.addEventListener("click", async () => {
                    await service.update(this.taskId, {
                        ...this.task,
                        end_date: new Date(input.value).toISOString(),
                    });
                    setTimeout(() => {
                        navigateTo("http://localhost:3000/dashboard");
                    }, 4000);
                });
            }
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }
}
