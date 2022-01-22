const endpoint = 'http://localhost:3030/jsonstore/collections/books';

async function getAllBooks() {

    const response = await fetch(endpoint);
    if (response.ok) {
        const data = await response.json();
        const result = Object.entries(data).map(([k, v]) => Object.assign(v, { _id: k }));
        return Object.values(result);

    } else {
        const error = await response.json();
        return alert(error.message);
    }

}

async function addBook(book) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

}

async function getBook(id) {
    const response = await fetch(endpoint + '/' + id);

    if (response.ok) {
        const data = await response.json();
        const result = Object.assign(data, { _id: id });

        return result;

    } else {
        const error = await response.json();
        return alert(error.message);
    }
}

async function editBook(id, book) {
    const response = await fetch(endpoint + '/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    if (!response.ok) {

        const error = await response.json();
        return alert(error.message);
    }
}

async function deleteBook(id, book) {
    const response = await fetch(endpoint + '/' + id, {
        method: 'DELETE'
    });

    if (!response.ok) {

        const error = await response.json();
        return alert(error.message);
    }
}

const api = {
    getAllBooks,
    getBook,
    addBook,
    editBook,
    deleteBook
};

export default api;