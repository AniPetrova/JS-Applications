import * as api from './api.js';
const host = 'http://localhost:3030';

api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;

// change the url ends and check the data types

export async function getCatalog() {
   return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getAllArticles() {
    return await api.get(host +'/data/wiki?sortBy=_createdOn%20desc');
}

export async function createRecord(data) {
     return await api.post(host + '/data/wiki', data)
}

export async function getDetails(id) {
    return await api.get(host + '/data/wiki/' + id);
}

export async function deleteItem(id) {
    return await api.del(host  + '/data/wiki/' + id);
}

export async function editRecord(id, newData) {
    return await api.put(host + '/data/wiki/' + id, newData);
}

export async function getBySearch(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);
}
