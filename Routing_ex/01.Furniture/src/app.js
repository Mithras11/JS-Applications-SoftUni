import page from '../node_modules/page/page.mjs'; //.mjs!!!
import { render } from '../node_modules/lit-html/lit-html.js';

import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { myPage } from './views/myFurniture.js';

import * as api from './api/data.js';

window.api = api; //in order to test all functions in the browser

const main = document.querySelector('.container');

//--- View controller ---//

page('/', decorateContext, dashboardPage);
//page('/dashboard',renderMiddleware,dashboardPage);
page('/my-furniture', decorateContext, myPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);


document.getElementById('logoutBtn').addEventListener('click', async() => {
    await api.logout();
    setUserNav();
    page.redirect('/');
});



setUserNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

//updates navigation bar
function setUserNav() {
    const userId = sessionStorage.getItem('userId');

    if (userId != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}