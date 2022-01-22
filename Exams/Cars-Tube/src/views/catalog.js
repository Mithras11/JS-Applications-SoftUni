import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCars } from '../api/data.js';

const catalogTemplate = (data) => html `
        <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
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
    const data = await getCars();
    ctx.render(catalogTemplate(data));
}