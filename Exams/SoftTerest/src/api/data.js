import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;

export async function getItems() {
    return await api.get(
        host + "/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc"
    );
}

export async function getById(id) {
    return await api.get(host + "/data/ideas/" + id);
}


export async function createRecord(data) {
    return await api.post(host + "/data/ideas", data);
}

export async function editRecord(id, data) {
    return await api.put(host + "/data/cars/" + id, data);
}

export async function deleteRecord(id) {
    return await api.dlt(host + "/data/ideas/" + id);
}