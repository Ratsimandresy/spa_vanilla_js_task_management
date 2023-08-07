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

const service = {
    getTasks: async () => {
        try {
            const response = await fetch(BASE_URL);
            const tasks = response.json();
            return tasks;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getTask: async (taskLabel) => {
        try {
            const response = await fetch(`${BASE_URL}/${taskLabel}`);
            const task = response.json();
            return task;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    add: async (newTask) => {
        try {
            const response = await fetch(BASE_URL, {
                method: "post",
                body: JSON.stringify(newTask),
            });
            return response.status;
        } catch (error) {
            console.log(error);
        }
    },
    remove: async (taskLabel) => {
        try {
            await fetch(`${BASE_URL}/${taskLabel}`, { method: "delete" });
        } catch (error) {
            console.log(error);
        }
    },
    update: async (taskLabel, updatedTask) => {
        try {
            const response = await fetch(`${BASE_URL}/${taskLabel}`);
            if (!response) return;

            const copy = { ...response };

            Object.keys(copy).forEach((key) => {
                copy[key] = updatedTask[key];
            });

            await await fetch(`${BASE_URL}/${taskLabel}`, {
                method: "put",
                body: JSON.stringify(updatedTask),
            });
        } catch (error) {
            console.log(error);
        }
    },
};
export default service;
