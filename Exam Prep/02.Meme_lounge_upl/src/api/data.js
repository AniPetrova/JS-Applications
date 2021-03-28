import * as api from './api.js';
const host = 'http://localhost:3030';

api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;

export async function getCatalog() {
   return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}

export async function getMineCatalog() {
    const myId = sessionStorage.getItem('userId')
    return await api.get(host + '/data/memes?where=_ownerId%3D%22'+myId+'%22&sortBy=_createdOn%20desc');
}

export async function createRecord(data) {
     return await api.post(host + '/data/memes', data)
 }

export async function getUserDetails(id) {
    return await api.get(host + '/data/users/' + id);
}

export async function getDetails(id) {
    return await api.get(host + '/data/memes/' + id);
}

export async function deleteItem(id) {
    return await api.del(host  + '/data/memes/' + id);
}

export async function editRecord(id, newData) {
    return await api.put(host + '/data/memes/' + id, newData);
}