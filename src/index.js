import { router, navigateTo } from "./router/index.js";
import Utils from "./utils/Utils.js";
import service from "./services/index.js";

const { initializeApp, toggleActive, collapse } = Utils;

window.addEventListener("load", async () => {
    await initializeApp();
    await router();
    let storage = JSON.parse(localStorage.getItem("todoList"));

    storage = storage ? storage : [];
});

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
            toggleActive(e);
        }
    });
    router();

    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-collapsed]")) {
            e.preventDefault();
            collapse(e);
        }
    });
});
