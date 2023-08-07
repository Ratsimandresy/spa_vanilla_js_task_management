import AbstractView from "../pages/AbstractView.js";

export default class Toast extends AbstractView {
    constructor(param, infoIcon, message, type, title = "") {
        super(param);
        this.infoIcon = infoIcon;
        this.message = message;
        this.title = title;
        this.type = type;

        //?type for the style of the toast
    }

    activateToast(button, duration = 2000) {
        const toastElement = document.querySelector(".toast");
        const closeIcon = document.querySelector(".close");

        let timer;

        button.addEventListener("click", () => {
            toastElement.classList.add("active");

            timer = setTimeout(() => {
                toastElement.classList.remove("active");
            }, duration);
        });

        closeIcon.addEventListener("click", () => {
            toastElement.classList.remove("active");

            clearTimeout(timer);
        });
    }

    async render() {
        return `
        <div class="toast">
             <div class="toast-content">
                <i class="material-icons">${this.infoIcon}</i>
                 <div class="message">
                    <span class="text text-1">${this.title}</span>
                     <span class="text text-2">${this.message}</span>
                 </div>
             </div>
             <i class="material-icons close">close</i>
         </div>
        `;
    }

    async after_render() {}
}
