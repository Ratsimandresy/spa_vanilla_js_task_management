import AbstractView from "./AbstractView.js";
import { getTasks } from "../services/index.js";
import ErrorPAge from "./404.js";
import TaskCard from "../components/Dashboard/TaskCard.js";

export default class Dashboard extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    getTasks = async () => await getTasks();

    async render() {
        try {
            const tasks = await this.getTasks();

            return `
         <section id="dashboard" class="page__content">
             <h1>Dashboard</h1>

             <div class="cards_container">
                ${tasks && tasks.map(TaskCard).join("")}
            </div>
    
        </section>
    `;
        } catch (error) {
            console.log(error);
            const errorPage = new ErrorPAge();
            return await errorPage.render();
        }
    }
}
