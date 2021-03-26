import * as api from './api.js';
const host = 'http://localhost:3030';

api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;

export async function getCatalog() {
   return await api.get(host + '/data/catalog');
}

export async function getMineCatalog() {
    const myId = sessionStorage.getItem('userId')
    return await api.get(host + '/data/catalog?where=_ownerId%3D%22'+ myId +'%22');
}

export async function createRecord(data) {
    return await api.post(host + '/data/catalog', data)
}

export async function getDetails(id) {
    return await api.get(host + '/data/catalog/' + id);
}

export async function deleteItem(id) {
    return await api.del(host  + '/data/catalog/' + id);
}

export async function editDetails(id, newData) {
    return await api.put(host + '/data/catalog/' + id, newData);
}