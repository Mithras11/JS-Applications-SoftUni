import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCars, getSize } from '../api/data.js';

const catalogTemplate = (data, page, pages) => html `
        <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
                <div>
                    Page ${page} / ${pages}
                   ${page > 1 ? html `<a class="button-list" href="/catalog?page=${page - 1}">&lt; Prev</a>` : ''}
                   ${page < pages ? html `<a class="button-list" href="/catalog?page=${page + 1}">Next &gt;</a>` : ''}
                </div>
                 ${data.length != 0 ? data.map(itemTemplate) : emptyTemplate()}       
            </div>
        </section>`;

const itemTemplate = (item) => html `
    <div class="listing">
        <div class="preview">
            <img src=${item.imageUrl}>
        </div>
        <h2>${item.brand} ${item.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${item.year}</h3>
                <h3>Price: ${item.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${item._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`;

const emptyTemplate = () => html `
    <p class="no-cars">No cars in database.</p>`;


export async function catalogPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) || 1;
    const count = await getSize();
    const pages = Math.ceil(count / 3);

    const data = await getCars(page);
    ctx.render(catalogTemplate(data, page, pages));
}