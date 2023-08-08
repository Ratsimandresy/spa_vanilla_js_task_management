import AbstractView from "./AbstractView.js";
import service from "../services/index.js";
import TaskCard from "../components/Dashboard/TaskCard.js";
import { navigateTo } from "../router/index.js";

export default class extends AbstractView {
    tasks;

    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    getTasks = async () => await service.getTasks();

    update(date, day, days, month, months, year) {
        let now = new Date();
        date.innerText = now.getDate();
        day.innerText = days[now.getDay()];
        month.innerText = months[now.getMonth()];
        year.innerText = now.getFullYear();
    }

    renderTodayTasks(todayTasks) {
        if (todayTasks.length === 0) {
            return `
                <p class="no_task_paragraph">No task are planned for today</p>
                <div>
                    <p>Create task</p>
                    <i class="material-icons">check_circle</i>
                </div>
            `;
        }

        return `
            ${todayTasks.map(TaskCard).join("")}
        `;
    }

    async render() {
        try {
            this.tasks = await this.getTasks();

            const today = new Date();
            const todayDay = today.getDay();
            const todayYear = today.getFullYear();

            const todayTasks = [...this.tasks]
                .filter((task) => {
                    const taskDate = new Date(task.start_date);
                    return (
                        taskDate.getDay() === todayDay &&
                        taskDate.getFullYear() === todayYear
                    );
                })
                .reverse();

            return `
        <section id="home" class="page__content">
          <div class="home_content">
                <header>
                    <div class="header">
                        <i class="material-icons home">local_activity</i>
                        <h1>Let's get started</h1>
                    </div>
                    <div id="box-calendar">
                        <div>
                            <div id="month"></div>
                        </div>
                        <div id="two">
                            <div id="day"></div>
                        <div id="date"></div>
                        <div id="year"></div>
                        </div>
                    </div>
                </header>
                <div class="today_tasks">
                    <h2>Today's tasks</h2>
                    <div class="today_task_container">
                        ${this.renderTodayTasks(todayTasks)}
                    </div>
                </div>
          </div>
        </section>
        `;
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }

    async after_render() {
        let date = document.getElementById("date"),
            day = document.getElementById("day"),
            month = document.getElementById("month"),
            year = document.getElementById("year"),
            days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

        if (date && day && month && year) {
            this.update(date, day, days, month, months, year);
        }

        console.log(this.tasks);
    }
}
