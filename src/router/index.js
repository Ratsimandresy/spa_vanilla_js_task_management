import Utils from "../utils/Utils.js";
import { routes } from "./routes.js";
import Menu from "../components/Menu.js";

const menu = new Menu();
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
            result: ["/page-not-found"],
        };
    }

    const view = new match.route.view(getParams(match));

    const page = document.querySelector("#app").childNodes[3];

    page ? (page.innerHTML = await view.render()) : null;
};

export { navigateTo, router };
