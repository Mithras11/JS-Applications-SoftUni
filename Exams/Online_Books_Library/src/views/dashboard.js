import { html } from "../../node_modules/lit-html/lit-html.js";
import { getBooks } from "../api/data.js";

const dashboardTemplate = (data) => html `
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>

    ${data.length != 0 ?
        html `<ul class="other-books-list">${data.map(itemTemplate)}</ul>` : emptyTemplate()}
</section>`;

const itemTemplate = (item) => html `
<li class="otherBooks">
  <h3>${item.title}</h3>
  <p>Type: ${item.type}</p>
  <p class="img"><img src=${item.imageUrl} /></p>
  <a class="button" href="/details/${item._id}">Details</a>
</li>`;

const emptyTemplate = () => html `
    <p class="no-books">No books in database!</p>`;

export async function dashboardPage(ctx) {
    const data = await getBooks();
    ctx.render(dashboardTemplate(data));
}