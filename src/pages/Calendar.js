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
        // set variables
        let today = new Date();
        let dayInt = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        // body of the calendar
        let calendarBody = document.getElementById("days");

        let months = [
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

        let nextBtn = document.getElementById("next");
        let prevBtn = document.getElementById("prev");

        nextBtn.onclick = function () {
            next();
        };
        prevBtn.onclick = function () {
            previous();
        };

        // on select of date
        // let selectDay = document.getElementsByClassName("singleDay");

        showCalendar(month, year);

        function showDate(e) {
            let showYear = e.getAttribute("data-year");
            let showMonth = e.getAttribute("data-month");
            let showDay = e.getAttribute("data-day");
            document.getElementById("select").innerHTML =
                showDay + " " + months[showMonth] + " " + showYear;
        }

        function showCalendar(month, year) {
            let firstDay = new Date(year, month).getDay();
            calendarBody.innerHTML = "";
            let totalDays = daysInMonth(month, year);

            blankDates(firstDay === 0 ? 6 : firstDay - 1);
            for (let day = 1; day <= totalDays; day++) {
                let cell = document.createElement("li");
                let cellText = document.createTextNode(day);
                if (
                    dayInt === day &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    cell.classList.add("active");
                }

                cell.setAttribute("data-day", day);
                cell.setAttribute("data-month", month);
                cell.setAttribute("data-year", year);

                cell.classList.add("singleDay");
                cell.appendChild(cellText);
                cell.onclick = function (e) {
                    showDate(e.target);
                };
                calendarBody.appendChild(cell);
            }

            document.getElementById("month").innerHTML = months[month];
            document.getElementById("year").innerHTML = year;
        }

        function daysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }

        function blankDates(count) {
            for (let x = 0; x < count; x++) {
                let cell = document.createElement("li");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                cell.classList.add("empty");
                calendarBody.appendChild(cell);
            }
        }

        function next() {
            year = month === 11 ? year + 1 : year;
            month = (month + 1) % 12;
            showCalendar(month, year);
        }

        function previous() {
            year = month === 0 ? year - 1 : year;
            month = month === 0 ? 11 : month - 1;
            showCalendar(month, year);
        }

        // function select(d, m, y) {
        // 	document.getElementById("select").innerHTML = new Date(y, m, d);
        // }
    }
}
