import { render } from '../node_modules/lit-html/lit-html.js';
import { mainTempl } from './views.js';
import api from './data.js';

const body = document.querySelector('body');
let books = [];

const funcs = {
    loadBooks,
    onClick,
    onAdd,
    onEdit,
};


start();

function start() {

    render(mainTempl(books, funcs), body);
}


async function loadBooks() {
    books = await api.getAllBooks();
    render(mainTempl(books, funcs), body);
}

async function onAdd(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    if (book.title == '' || book.author == '') {
        alert('All fields are required!')
        return;
    }


    await api.addBook(book);
    loadBooks();
    event.target.reset();
}

async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id');

    const book = {
        title: formData.get('title'),
        author: formData.get('author'),
    }

    const confirmed = confirm('Book info will be modified!');

    if (!confirmed) {
        return;
    }

    await api.editBook(id, book);

    loadBooks();
    event.target.reset();
}


async function onClick(event) {
    event.preventDefault();

    if (event.target.id == 'editBtn') {

        const bookId = event.target.parentNode.parentNode.id;
        const bookToEdit = await api.getBook(bookId);

        render(mainTempl(books, funcs, bookToEdit), body);
    }

    if (event.target.id == 'deleteBtn') {

        const bookId = event.target.parentNode.parentNode.id;
        const bookToEdit = await api.deleteBook(bookId);

        loadBooks();
    }


}