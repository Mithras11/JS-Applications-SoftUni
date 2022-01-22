import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { logout } from "../api/data.js";
import page from "/node_modules/page/page.mjs";

export function setUserNav() {

    let userId = sessionStorage.getItem("userId");

    const loggedTemplate = html `
      <li class="nav-item active">
        <a class="nav-link" href="/create">Create</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="javascript:void(0)" id="logoutBtn">Logout</a>
      </li>`;

    const guestTemplate = html `
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/register">Register</a>
      </li>`;

    const template = html ` <div class="container">
      <a class="navbar-brand" href="/">
        <img src="/images/idea.png" alt="" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/dashboard">Dashboard</a>
          </li>
          ${userId ? loggedTemplate : guestTemplate}
        </ul>
      </div>
    </div>`;

    const navTag = document.querySelector("nav");
    render(template, navTag);

    if (sessionStorage.getItem("userId")) {
        //document.querySelector('.navbar-toggler').style.display = "inline-block";
        document.getElementById("logoutBtn").addEventListener("click", async() => {
            await logout();
            setUserNav();
            page.redirect("/");
        });
    }
}