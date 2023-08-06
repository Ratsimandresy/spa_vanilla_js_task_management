import AbstractView from "../pages/AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
    }

    entries = [
        {
            title: "Today",
            path: "/",
            icon: "local_activity",
        },
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: "dashboard",
        },
        {
            title: "Add task",
            path: "/form",
            icon: "add_circle",
        },
        {
            title: "Calendar",
            path: "/calendar",
            icon: "calendar_month",
        },
    ];

    async render() {
        return `
        <aside id="menu">
        <header>
            <h2>TodoList</h2>
            <i class="material-icons">checklist</i>
        </header>
        <nav class="nav">
        ${this.entries
            .map(
                ({ title, icon, path }) => `
                <p class="nav__entry">
                    <i class="material-icons">
                        <a href="${path}" class="nav__link icon" data-link>
                            ${icon}
                        </a>
                    </i>
                    <a href="${path}" class="nav__link" data-link> ${title} </a>
                </p>
        `
            )
            .join("")}
           
        </nav>
        <button data-collapsed id="nav_collapse_btn">
            <i data-collapsed class="material-icons">chevron_left</i>
        </button>
    </aside>
        `;
    }
}
