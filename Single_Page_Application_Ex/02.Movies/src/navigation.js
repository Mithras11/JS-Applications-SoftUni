import { showHome } from './home.js';
import { showCreate } from "./create.js";
import { showLogin } from './login.js';
import { showRegister } from './register.js';
import { logout } from './logout.js';

const links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate
};

export function setUpNavigation() {
    const email = sessionStorage.getItem('email');

    if (email != null) {

        document.getElementById('welcome-msg').textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = "block");
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = "none");

    } else {

        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = "none");
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = "block");

    }



    document.querySelector('nav').addEventListener('click', (event) => {
        const view = links[event.target.id];

        if (typeof view == 'function') {
            event.preventDefault(); //!!
            view();
        }

    });

    document.getElementById('createLink').addEventListener('click', (event) => { //специално за бутона AddMovie
        event.preventDefault();

        showCreate();
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);
}