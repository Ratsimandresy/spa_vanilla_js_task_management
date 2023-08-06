import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Not found");
    }

    async render() {
        return `
            <h1>Sorry, there was error</h1>
           
        `;
    }
}