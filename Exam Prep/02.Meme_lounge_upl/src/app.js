import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import {homePage} from './views/home.js';
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {allMemesPage} from './views/allMemes.js';
import {createPage} from './views/create.js';
import {profilePage} from './views/profile.js'
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';

import * as api from './api/data.js';
import { logout } from './api/api.js';

window.api = api;
export const main = document.querySelector('main');
page('/', decoration, homePage);
page('/register', decoration, registerPage);
page('/login', decoration, loginPage);
page('/allMemes', decoration, allMemesPage)
page('/create', decoration, createPage);
page('/profile', decoration, profilePage);
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
    const userEmail = sessionStorage.getItem('email');
    if (userEmail != null){
        document.querySelector('div.profile > span').textContent = `Welcome, ${userEmail}`;
        document.querySelector('.user').style.display = '';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = '';
    }
}

