import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;


export async function getCars(page = 1) {
    return await api.get(host + `/data/cars?sortBy=_createdOn%20desc&offset=${(page-1)*3}&pageSize=3`);
}

export async function getSize() {
    return await api.get(host + '/data/cars?count');
}

export async function getById(id) {
    return await api.get(host + '/data/cars/' + id);
}

export async function getMyCars() {

    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function searchCars(query) {

    return await api.get(host + `/data/cars?where=year%3D${query}`);
}

export async function createRecord(data) {
    return await api.post(host + '/data/cars', data);
}

export async function editRecord(id, data) {
    return await api.put(host + '/data/cars/' + id, data);
}

export async function deleteRecord(id) {
    return await api.dlt(host + '/data/cars/' + id);
}