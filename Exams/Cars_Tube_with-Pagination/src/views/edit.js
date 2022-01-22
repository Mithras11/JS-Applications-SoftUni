import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, editRecord } from '../api/data.js';

const editTemplate = (item, onSubmit) => html `
        <section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit=${onSubmit}>
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit a listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value=${item.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value=${item.model}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value=${item.description}

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value=${item.year}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${item.imageUrl}>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value=${item.price}>

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>`;

export async function editPage(ctx) {

    const id = ctx.params.id;
    const item = await getById(id);

    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const brand = formData.get('brand');
        const model = formData.get('model');
        const description = formData.get('description');
        const year = Number(formData.get('year'));
        const imageUrl = formData.get('imageUrl');
        const price = Number(formData.get('price'));

        if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {

            return alert('All fields are required!');
        }

        const newData = {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        };


        await editRecord(item._id, newData);
        ctx.page.redirect('/details/' + id);


    }
}