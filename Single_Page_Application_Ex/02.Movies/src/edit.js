import { showHome } from './home.js';

let main;
let section;

export function setUpEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showEdit(id) {

    main.innerHTML = '';
    main.appendChild(section);


    const response = await fetch('http://localhost:3030/data/movies/' + id);
    const currMovie = await response.json();

    section.querySelector('[name="title"]').value = currMovie.title;
    section.querySelector('[name="description"]').value = currMovie.description;
    section.querySelector('[name="imageUrl"]').value = currMovie.img;

    section.querySelector('form').addEventListener('submit', async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');

        if (title === '' || description === '' || img === '') {

            return alert('All fields are required!');
        }

        const confirmed = confirm('Movie info will be modified!');

        if (confirmed) {

            const editResponse = await fetch('http://localhost:3030/data/movies/' + id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({ title, description, img })
            });

            if (!editResponse.ok) {
                const error = await response.json();
                alert(error.message);
            }
        }

        showHome();
    });
}