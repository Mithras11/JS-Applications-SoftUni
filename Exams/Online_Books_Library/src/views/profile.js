import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyBooks } from '../api/data.js';

const myTemplate = (data) => html `
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${data.length != 0 ?
        html `<ul class="my-books-list">${data.map(bookTemplate)}</ul>` : emptyTemplate()}
            
        </section>`;

const bookTemplate = (book) => html `
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

const emptyTemplate = () => html `
<p class="no-books">No books in database!</p>`;

export async function myPage(ctx) {
      
    const data = await getMyBooks();
    ctx.render(myTemplate(data));
}