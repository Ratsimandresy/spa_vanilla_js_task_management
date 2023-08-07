import AbstractView from "./AbstractView.js";
import service from "../services/index.js";
import Utils from "../utils/Utils.js";
import { navigateTo } from "../router/index.js";

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
                    <div class="inner_card">
                        <div>
                            <h1>${this.task.label}</h1>
                            <div class="task_state in_progress">in progress</div>
                        </div>
                        <small>
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
            </section>
        `;
    }

    async after_render() {
        try {
            const input = document.getElementById("due-date-input");

            input.addEventListener("change", (e) => {
                e.preventDefault();
                this.setDueDate(e.target.value);
            });

            const check = document.querySelector(".material-icons.due-date");

            check.addEventListener("click", async () => {
                await service.update(this.taskId, {
                    ...this.task,
                    end_date: new Date(input.value).toISOString(),
                });
                await this.render();
            });
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }
}
