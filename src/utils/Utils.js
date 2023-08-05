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
        const entries = e.target.parentElement.parentElement.childNodes;
        const filtered = Array.prototype.filter.call(
            entries,
            (node) => node.nodeName != "#text"
        );
        filtered.forEach((entry) => {
            entry !== e.target.parentElement && entry.classList.add("active");
            entry.classList.toggle("active");
        });
    },
};

export default Utils;
