import { BASE_URL, MethodType } from "./environments.js";

const controller = new AbortController();
const signal = controller.signal;

const apiCall = async (method, body) => {
    const options = {
        method: method,
        body: JSON.stringify(body) || null,
    };

    try {
        const response = await fetch(BASE_URL, { signal }, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    } catch (error) {
        console.log(error);
        setTimeout(() => controller.abort(), 500);
    }
};

const getTasks = async () => {
    try {
        const response = await apiCall("get");
        const tasks = response.json();
        return tasks;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const add = async (newTask) => {
    try {
        const response = await apiCall("post", newTask);
        const json = response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

const remove = async (taskLabel) => {
    try {
        await apiCall(`${BASE_URL}/${taskLabel}`, MethodType.DELETE);
    } catch (error) {
        console.log(error);
    }
};

const update = async (taskName, updatedTask) => {
    try {
        const response = await apiCall(
            `${BASE_URL}${taskName}`,
            MethodType.GET
        );
        if (!response) return;

        const copy = { ...response };

        Object.keys(copy).forEach((key) => {
            copy[key] = updatedTask[key];
        });

        await apiCall(`${BASE_URL}/${taskName}`, MethodType.PUT, updatedTask);
    } catch (error) {
        console.log(error);
    }
};

export { apiCall, getTasks, add, remove, update };
