import Utils from "../../utils/Utils.js";
import { remove } from "../../services/index.js";

const TaskCard = ({ label, description, start_date, end_date }) => {
    let dueDate;
    if (end_date) {
        dueDate = new Date(end_date)
            .toJSON()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/");
    }

    const dueDateElement = () => {
        if (dueDate) {
            return `
            <p>
                <i class="material-icons">calendar_month</i>
                <span>
                    ${dueDate}
                </span>
            </p>
            `;
        }
        return `<p></p>`;
    };

    const deleteTask = (e) => {
        e.preventDefault();
        console.log(e.target);
    };

    const deleteBtn = () => {
        return `
            <button id="${label}">
                <i class="material-icons">delete</i>
            </button>
        `;
    };

    const timePassed = Utils.timeSince(start_date);

    return `
        <div class="task_card" id="{label}" key$"${label}">
            <div class="round">
                <input type="checkbox" checked id="checkbox-${label}" />
                 <label for="checkbox-${label}"></label>
             </div>
            <p>
               <bold>
                    ${label}
               </bold> 
                <small>
                    ${timePassed}
                </small>
            </p>
            ${dueDateElement()}
            ${deleteBtn()}
        </div>
`;
};

export default TaskCard;
