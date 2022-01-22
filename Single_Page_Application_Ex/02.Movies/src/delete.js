import { showHome } from "./home.js";

export async function onDelete(event, id) {
    event.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this movie?');

    if (confirmed) {
        const response = await fetch('http://localhost:3030/data/movies/' + id, {
            method: 'DELETE',
            headers: { 'X-Authorization': sessionStorage.getItem('authToken') }
        });

        if (response.ok) {

            alert('Movie deleted!');
            showHome();

        } else {
            const error = await response.json();
            alert(error.message);
        }
    }

}