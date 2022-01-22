import { showHome } from './home.js';

let main;
let section;

export function setUpRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}


async function onSubmit(event) {
    event.preventDefault();

    // const formData = new FormData(event.target); // FormData() не бачка по неизвестни причини?!

    // const email = formData.get('email');
    // const password = formData.get('password');
    // const repass = formData.get('repeatPassword');

    let email = event.target.querySelector('input[name="email"]').value;
    let password = event.target.querySelector('input[name="password"]').value;
    let repass = event.target.querySelector('input[name="repeatPassword"]').value;

    const body = JSON.stringify({ email, password });


    if (email = '' || password == '') {
        return alert('All fields are required!');

    } else if (password != repass) {
        return alert('Passwords don\'t match!');
    }



    const response = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    });

    if (response.ok) {

        event.target.reset(); //изчиства полетата на формуляра

        const data = await response.json();

        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('email', data.email);

        document.getElementById('welcome-msg').textContent = `Welcome, ${data.email}`;
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = "block");
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = "none");

        showHome();

    } else {
        const error = await response.json();
        alert(error.message);
    }
}


export async function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);
}