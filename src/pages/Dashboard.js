import AbstractView from "./AbstractView.js";
import service from "../services/index.js";
import TaskCard from "../components/Dashboard/TaskCard.js";
import { navigateTo } from "../router/index.js";

export default class Dashboard extends AbstractView {
    tasks;

    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    getTasks = async () => await service.getTasks();

    async render() {
        try {
            this.tasks = await this.getTasks();

            return `
         <section id="dashboard" class="page__content">
             <h1>Dashboard</h1>
             <div class="cards_container">
                ${this.tasks && this.tasks.map(TaskCard).join("")}
            </div>
    
        </section>
    `;
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }

    async after_render() {
        try {
            const buttons = document.querySelectorAll("button.delete_button");
            
            buttons.forEach((button) => {
                button.addEventListener("click", async (e) => {
                    e.preventDefault();
                    const taskLabel = e.target.dataset.label;
                    const task = e.target.parentNode.parentNode.parentNode;
                    setTimeout(() => {
                        task.classList.add("deleted");
                    }, 300);

                    setTimeout(async () => {
                        task.remove();
                        await service.remove(taskLabel);
                    }, 1000);
                });
            });
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }
}
