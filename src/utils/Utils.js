import Menu from "../components/Menu.js";

const menu = new Menu();

const Utils = {
    pathToRegex: (path) => {
        const parts = path.split("/").map((part) => {
            if (part.startsWith(":")) {
                return "(.+)";
            }
            return part;
        });

        const regexString = "^" + parts.join("\\/") + "$";
        return new RegExp(regexString);
    },

    getParams: (match) => {
        const keys = [...match.route.path.matchAll(/:(\w+)/g)].map(
            (result) => result[1]
        );
        const values = match.result.slice(1);

        return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
    },

    initializeApp: async () => {
        const app = document.querySelector("#app");
        app.innerHTML = await menu.render();

        const content = document.createElement("div");
        content.setAttribute("id", "page");

        app.append(content);
    },

    toggleActive: (e) => {
        const parent = e.target.parentElement;
        const grandParent = parent.parentElement;
        const entries = Array.from(document.querySelectorAll(".nav__entry"));

        entries.forEach((entry) => {
            if (entry !== parent && entry !== grandParent) {
                entry.classList.remove("active");
            } else {
                entry.classList.toggle("active");
            }
        });
    },

    collapse: (e) => {
        e.preventDefault();
        const app = document.getElementById("app");
        const btn = document.getElementById("nav_collapse_btn");
        app.classList.toggle("collapsed");

        if (app.classList.contains("collapsed")) {
            btn.innerHTML =
                "<i data-collapsed class='material-icons'>chevron_right</i>";
        } else {
            btn.innerHTML =
                "<i data-collapsed class='material-icons'>chevron_left</i>";
        }
    },
    timeSince: (date) => {
        const units = [
            "years",
            "months",
            "days",
            "hours",
            "minutes",
            "seconds",
        ];
        const durations = [31536000, 2592000, 86400, 3600, 60, 1];

        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let result = "";

        for (let i = 0; i < units.length; i++) {
            const interval = seconds / durations[i];
            if (interval >= 1) {
                result = `${Math.floor(interval)} ${units[i]} ago`;
                break;
            }
        }

        return result || "just now";
    },
    formatDate: (date) => {
        if (date) {
            return new Date(date)
                .toJSON()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/");
        }
        return "No due date set";
    },
    checkPastDate: (date) => {
        const dueDate = new Date(date);
        const currentDate = new Date();

        return dueDate.getTime() < currentDate.getTime();
    },
};

export default Utils;
