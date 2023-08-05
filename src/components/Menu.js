import AbstractView from "../pages/AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        return `
        <aside id="menu">
        <header>
            <h2>TodoList</h2>
            <i class="material-icons">checklist</i>
        </header>
        <nav class="nav">
            <p class="nav__entry active">
                <i class="material-icons">
                    <a href="/" class="nav__link icon" data-link>
                        local_activity
                    </a>
                </i>
                <a href="/" class="nav__link" data-link> Today </a>
            </p>
            <p data-link class="nav__entry">
                <i class="material-icons">
                    <a href="/dashboard" class="nav__link icon" data-link>
                        dashboard
                    </a>
                </i>
                <a href="/dashboard" class="nav__link" data-link>
                    Dashboard
                </a>
            </p>
            <p class="nav__entry">
                <i class="material-icons">
                    <a href="/form" class="nav__link icon" data-link>
                        add_circle
                    </a>
                </i>
                <a href="/form" class="nav__link" data-link>
                    Add task
                </a>
            </p>
            <p class="nav__entry">
                <i class="material-icons">
                    <a href="/calendar" class="nav__link icon" data-link>
                        calendar_month
                    </a>
                </i>
                <a href="/calendar" class="nav__link" data-link>
                    Calendar
                </a>
            </p>
        </nav>
        <button id="nav_collapse_btn">
            <i class="material-icons">chevron_left</i>
        </button>
    </aside>
        `;
    }
}
