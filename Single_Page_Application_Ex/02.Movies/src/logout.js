import { showHome } from './home.js'

export async function logout() {
    const token = sessionStorage.getItem('authToken');

    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: { 'X-Authorization': token }
    });

    if (response.ok) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');

        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = "none");
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = "block");

        showHome();

    } else {
        const error = await response.json();
        alert(error.message);
    }
}