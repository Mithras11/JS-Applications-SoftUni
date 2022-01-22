import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import * as api from './api/data.js';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myPage } from './views/profile.js';
import { searchPage } from './views/search.js';


const main = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await api.logout();
    setUserNav();
    page.redirect('/');
});

setUserNav();



page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/catalog', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, myPage);
page('/catalogByYear', decorateContext, searchPage);

page.start();




function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    const username = sessionStorage.getItem('username');

    if (token != null) {
        document.getElementById('greeting').textContent = `Welcome ${username}`;
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = '';

    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}