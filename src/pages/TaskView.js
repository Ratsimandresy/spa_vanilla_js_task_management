import AbstractView from "./AbstractView.js";
import service from "../services/index.js";
import Utils from "../utils/Utils.js";

const { formatDate } = Utils;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.taskId = params.id;
        this.setTitle("Task");
    }

    getTask = async () => service.getTask(decodeURIComponent(this.taskId));

    async render() {
        const task = await this.getTask();

        const createdAt = formatDate(task.start_date);

        const dueDate = formatDate(task.end_date);

        return `
            <section id="task-view" class="page__content">
                <div class="task__content">
                    <div class="inner_card">
                        <div>
                            <h1>${task.label}</h1>
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
                        <small>${task.description}</small>
                    </div>
                    <div class="inner_card bg">
                        <div class="task_dueDate">
                            <i class="material-icons">schedule</i>
                            <p>Due date :</p><span>${dueDate}</span>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
