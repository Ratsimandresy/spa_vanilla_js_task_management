import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Not found");
    }

    async getHtml() {
        return `
            <h1>Page Not Found !! oops</h1>
           
        `;
    }
}