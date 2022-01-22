import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { logout } from "../api/data.js";
import page from "/node_modules/page/page.mjs";


export function setUserNav() {

    let userId = sessionStorage.getItem('userId');
    let email = sessionStorage.getItem('email');

    const loggedTemplate = html `
            <div id="user">
                <span>Welcome, ${email}</span>
                <a class="button" href="/myPage">My Books</a>
                <a class="button" href="/create">Add Book</a>
                <a class="button" href="javascript:void(0)" id="logoutBtn">Logout</a>
            </div>`;

    const guestTemplate = html `
            <div id="guest">
                <a class="button" href="/login">Login</a>
                <a class="button" href="/register">Register</a>
            </div>`;

    const template = html `
            <section class="navbar-dashboard">
                <a href="/dashboard">Dashboard</a>                   
                ${userId ? loggedTemplate : guestTemplate}
            </section>`;

    const navTag = document.querySelector('nav');
    render(template, navTag);


    if (sessionStorage.getItem('userId')) {
        document.getElementById('logoutBtn').addEventListener('click', async() => {
            await logout();
            setUserNav();
            page.redirect('/dashboard');
        })
    }
}