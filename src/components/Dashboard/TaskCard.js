const TaskCard = ({ label, description, start_date }) => {

    const date = new Date(start_date).toJSON().slice(0,10).split('-').reverse().join('/')


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
                    2 min ago
                </small>
            </p>
            <p>
                <i class="material-icons">calendar_month</i>
                <span>
                    ${date}
                </span>
            </p>
        </div>
`;
};

export default TaskCard;
