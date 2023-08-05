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
        app.innerHTML = await menu.getHtml();

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
};

export default Utils;
