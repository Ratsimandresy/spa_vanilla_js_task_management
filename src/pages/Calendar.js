import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Calendar");
    }

    async render() {
        return `
        <section id="calendar" class="page__content">
            <div id="calendar_container">
                 <div class="month">
                    <ul>
                    <li id="prev">&#10094;</li>
                    <li id="month"></li>
                    <li id="year"></li>
                    <li id="next">&#10095;</li>
                    </ul>
                </div>
                <ul id="weekdays">
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wen</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                    <li>Sun</li>
                </ul>
            <ul id="days"></ul>
    </section>
        `;
    }

    async after_render() {

    }
}