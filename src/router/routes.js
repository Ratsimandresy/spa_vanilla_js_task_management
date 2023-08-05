import Dashboard from "../pages/Dashboard.js";
import Home from "../pages/Home.js";
import Form from "../pages/Form.js";
import Calendar from "../pages/Calendar.js";
import Error404 from "../pages/404.js";
import PostView from "../pages/PostView.js";

export const routes = [
    { path: "/", view: Home },
    { path: "/dashboard", view: Dashboard },
    { path: "/posts/:id", view: PostView },
    { path: "/form", view: Form },
    { path: "/calendar", view: Calendar },
    { path: "/page-not_found", view: Error404 },
];
