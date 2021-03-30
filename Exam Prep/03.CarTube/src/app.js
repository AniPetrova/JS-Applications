import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import {homePage} from './views/home.js';
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {allCarsPage} from './views/allCars.js';
import {carsByYearPage} from './views/carsByYear.js';
import {createPage} from './views/create.js';
import {myListPage} from './views/myList.js'
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';

import * as api from './api/data.js';
import { logout } from './api/api.js';

//window.api = api;
export const main = document.querySelector('main');
page('/', decoration, homePage);
page('/register', decoration, registerPage);
page('/login', decoration, loginPage);
page('/allCars', decoration, allCarsPage)
page('/filtered', decoration, carsByYearPage)
page('/create', decoration, createPage);
page('/myCars', decoration, myListPage);
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
    const username = sessionStorage.getItem('username');
    if (username != null){
        document.getElementById('profile').style.display = '';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome-user').textContent = `Welcome ${username}`;
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}

