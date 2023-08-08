import AbstractView from "./AbstractView.js";
import service from "../services/index.js";
import TaskCard from "../components/Dashboard/TaskCard.js";
import { navigateTo } from "../router/index.js";
import Utils from "../utils/Utils.js";
import Toast from "../components/Toast.js";

export default class Dashboard extends AbstractView {
    tasks;

    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    getTasks = async () => await service.getTasks();

    search() {
        try {
            let cards = document.querySelectorAll(".task_card");
            let search_query = document.getElementById("searchBox").value;

            cards.forEach((card) => {
                const dateSearch = card.childNodes[5].childNodes[3].innerText;
                const titleSearch = card.childNodes[3].childNodes[1].innerText;
                if (
                    dateSearch
                        .toLowerCase()
                        .includes(search_query.toLowerCase()) ||
                    titleSearch
                        .toLowerCase()
                        .includes(search_query.toLowerCase())
                ) {
                    card.classList.remove("is-hidden");
                } else {
                    card.classList.add("is-hidden");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    filterTasks(query, tasks) {
        const filterMap = {
            all: () => true,
            completed: (task) => task.classList.contains("completed"),
            inProgress: (task) => task.classList.contains("inProgress"),
            expired: (task) => task.classList.contains("expired"),
        };

        tasks.forEach((task) => {
            const filterFunction = filterMap[query];
            if (filterFunction && filterFunction(task)) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        });
    }

    async render() {
        try {
            this.tasks = await this.getTasks();

            const tasksList = JSON.parse(localStorage.getItem("tasksList"));

            console.log(tasksList);

            return `
            <div class="search_container">
                <div id="search-box">
                    <input placeholder="Search for task ..." style="border:none" type="search" id="searchBox">
                </div>
                <div class="select">
                     <select class="filter-tasks" name="tasks">
                        <option value="all"> all </option>
                        <option value="completed"> completed </option>
                        <option value="inProgress"> inProgress </option>
                        <option value="expired"> expired </option>
                    </select>
                 </div>
            </div>
         <section id="dashboard" class="page__content">
             <div class="cards_container">
                ${this.tasks && this.tasks.reverse().map(TaskCard).join("")}
            </div>
            <div class="toast_container"></div>
        </section>
    `;
        } catch (error) {
            console.log(error);
            navigateTo("http://localhost:3000/error");
        }
    }

    async after_render() {
        try {
            const searchBox = document.getElementById("search-box");
            const toast = new Toast("", "info", "Task deleted !");
            const toast_container = document.querySelector(".toast_container");
            const checkBoxes = document.querySelectorAll(".round input");
            const select = document.querySelector(".filter-tasks");
            const allTasks = document.querySelectorAll(".task_card");

            if (select && allTasks) {
                select.addEventListener("click", (e) => {
                    const value = e.target.value;
                    this.filterTasks(value, allTasks);
                });
            }

            if (searchBox)
                searchBox.oninput = (e) => {
                    this.search();
                };

            checkBoxes.forEach((btn) => {
                btn.checked = false;
                btn.addEventListener("click", (e) => {
                    const title = e.target.parentNode.parentNode.childNodes[3];
                    const card = e.target.parentNode.parentNode;

                    if (e.target.checked) {
                        title.style.textDecoration = "line-through";
                        title.style.color = "#2eb1a1";
                        card.style.backgroundColor = "#f3f3f3";
                        card.classList.replace("inProgress", "completed");
                    } else if (!e.target.checked) {
                        title.style.textDecoration = "none";
                        title.style.color = "white";
                        card.style.backgroundColor = "#a0c0d6";
                        card.classList.replace("completed", "inProgress");
                    }
                    this.render();
                });
            });

            if (toast_container) {
                toast_container.innerHTML = await toast.render();
            }

            const buttons = document.querySelectorAll("button.delete_button");

            buttons.forEach((button) => {
                toast.activateToast(button);
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
