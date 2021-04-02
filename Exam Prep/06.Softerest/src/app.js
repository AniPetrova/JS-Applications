import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import {homePage} from './views/home.js';
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {catalogPage} from './views/catalog.js'
import {createPage} from './views/create.js';
import {detailsPage} from './views/details.js';
// import {editPage} from './views/edit.js';

import * as api from './api/data.js';
import { logout } from './api/data.js';

//window.api = api;
export const main = document.querySelector('main');
page('/', decoration, homePage);
page('/catalog', decoration, catalogPage);
page('/register', decoration, registerPage);
page('/login', decoration, loginPage);
page('/create', decoration, createPage);
page('/details/:id', decoration, detailsPage);
// page('/edit/:id', decoration, editPage);

setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();    
    setUserNav();  
    page.redirect('/');  
})

function decoration(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav(){
    const email = sessionStorage.getItem('email');
    if (email != null){
        document.querySelectorAll('.user').forEach(e => e.style.display = 'block');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
    } else {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'block');
    }
}

