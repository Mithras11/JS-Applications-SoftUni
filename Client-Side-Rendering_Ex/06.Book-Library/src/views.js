import { html } from '../node_modules/lit-html/lit-html.js';

export { mainTempl };

const mainTempl = (data, funcs, bookToEdit) => html `
    <button id="loadBooks" @click=${funcs.loadBooks}>LOAD ALL BOOKS</button>
    ${tableTempl(data,funcs, bookToEdit)}
    ${bookToEdit? editFormTempl(funcs,bookToEdit) : addFormTempl(funcs)}`;

const tableTempl = (data, funcs) => html `
    <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody @click=${funcs.onClick}>
                ${data.map(x=>rowTempl(x))}
            </tbody>
    </table>`;

const rowTempl = (data) => html `
    <tr id=${data._id}>
        <td>${data.title}</td>
        <td>${data.author}</td>
        <td>
            <button id="editBtn">Edit</button>
            <button id="deleteBtn">Delete</button>
        </td>
    </tr>`;

const addFormTempl = (funcs) => html `
    <form id="add-form" @submit=${funcs.onAdd}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>`;

const editFormTempl = (funcs, book) => html `
    <form id="edit-form" @submit=${funcs.onEdit}>
            <input type="hidden" name="id" .value=${book._id}>
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title..." .value=${book.title}>
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author..." .value=${book.author}>
            <input type="submit" value="Save">
    </form>`