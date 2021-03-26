import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js'

import {loadDashboardPage} from './views/dashboard.js';
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {createPage} from './views/create.js';
import {myPage} from './views/my-furniture.js';
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';

import * as api from './api/data.js';
import { logout } from './api/api.js';

window.api = api;
export const main = document.querySelector('.container');
page('/', decoration, loadDashboardPage);
page('/register', decoration, registerPage);
page('/login', decoration, loginPage);
page('/create', decoration, createPage);
page('/my-furniture', decoration, myPage);
page('/details/:id', decoration, detailsPage);
page('/edit/:id', decoration, editPage);

setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    page.redirect('/');
    setUserNav();    
})

function decoration(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();

}

function setUserNav(){
    const userId = sessionStorage.getItem('userId');
    if (userId != null){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

