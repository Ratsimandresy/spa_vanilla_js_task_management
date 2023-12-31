import Utils from "../utils/Utils.js";
import { routes } from "./routes.js";

const { getParams, pathToRegex } = Utils;

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
        };
    });

    let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.result !== null
    );

    if (!match) {
        match = {
            route: routes[routes.length - 1],
            result: ["/error"],
        };
    }

    const view = new match.route.view(getParams(match));

    const page = document.querySelector("#app").childNodes[3];

    page ? (page.innerHTML = await view.render()) : null;

    await view.after_render();
};

export { navigateTo, router };
