import Dashboard from "../pages/Dashboard.js";
import Home from "../pages/Home.js";
import Form from "../pages/Form.js";
import Calendar from "../pages/Calendar.js";
import Error404 from "../pages/404.js";
import TaskView from "../pages/TaskView.js";

export const routes = [
    { path: "/", view: Home },
    { path: "/dashboard", view: Dashboard },
    { path: "/tasks/:id", view: TaskView },
    { path: "/form", view: Form },
    { path: "/calendar", view: Calendar },
    { path: "/error", view: Error404 },
];
