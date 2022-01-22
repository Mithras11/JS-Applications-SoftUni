import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;


export async function getBooks() {
    return await api.get(host + '/data/books?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return await api.get(host + '/data/books/' + id);
}

export async function getMyBooks() {

    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}


export async function createRecord(data) {
    return await api.post(host + '/data/books', data);
}

export async function editRecord(id, data) {
    return await api.put(host + '/data/books/' + id, data);
}

export async function deleteRecord(id) {
    return await api.dlt(host + '/data/books/' + id);
}