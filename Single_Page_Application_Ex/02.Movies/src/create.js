import { showHome } from "./home.js";

let main;
let section;

export function setUpCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSumbit);
}

async function onSumbit(event) {
    event.preventDefault();

    let title = event.target.querySelector('input[name="title"]').value;
    let description = event.target.querySelector('textarea[name="description"]').value;
    let img = event.target.querySelector('input[name="imageUrl"]').value;

    const movie = { title, description, img };

    if (title == '' || description == '' || img == '') {
        return alert('All fields are required!');
    }

    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(movie)
    });


    if (response.ok) {

        event.target.querySelector('input[name="title"]').value = '';
        event.target.querySelector('textarea[name="description"]').value = '';
        event.target.querySelector('input[name="imageUrl"]').value = '';

        showHome();

    } else {
        const error = await response.json();
        alert(error.message);
    }



}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);
}