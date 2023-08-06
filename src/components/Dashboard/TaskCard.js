import Utils from "../../utils/Utils.js";

const TaskCard = ({ label, description, start_date, end_date }) => {
    let dueDate;
    if (end_date) {
        dueDate = Utils.formatDate(end_date);
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
        return `<p> </p>`;
    };

    const id = label.split(" ").join("-");

    const timePassed = Utils.timeSince(start_date);

    return `
        <div class="task_card" id="${id}" key="${id}">
            <div class="round">
                <input type="checkbox" checked id="checkbox-${label}" />
                 <label for="checkbox-${label}"></label>
             </div>
            <p>
               <bold>
                  <a href="/tasks/${label}" data-link>
                    ${label}
                  </a>
               </bold> 
                <small>
                    ${timePassed}
                </small>
            </p>
            ${dueDateElement()}
            <div class="cards_btn">   
            <button data-dlt-btn class="btn delete_button" id="delete-${id}">
                <i data-label="${label}" data-dlt-btn class="material-icons">delete_outlined</i>
            </button>
        </div>
        </div>
`;
};

export default TaskCard;
