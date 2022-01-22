import { html } from '../../node_modules/lit-html/lit-html.js';
import { createRecord } from '../api/data.js';

const createTemplate = (onSubmit, invalidPrice, invalidModel, invalidMake, invalidYear, invalidDescriprion, invalidImg) => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (invalidMake ? ' is-invalid' : '')} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (invalidModel ? ' is-invalid' : '')} type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (invalidYear ? ' is-invalid' : '')} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (invalidDescriprion ? ' is-invalid' : '')} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (invalidPrice ? ' is-invalid' : '')} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (invalidImg ? ' is-invalid' : '')} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export async function createPage(ctx) {

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const make = formData.get('make');
        const model = formData.get('model');
        const year = Number(formData.get('year'));
        const description = formData.get('description');
        const price = Number(formData.get('price'));
        const img = formData.get('img');
        const material = formData.get('material');

        // const data = [...formData.entries()].reduce((acc, [k, v]) => {
        //     Object.assign(acc, {
        //         [k]: v
        //     });

        //     return acc;
        // }, {});


        // if (Object.entries(newItem).filter(([k, v]) => k != 'material').some(([k, v]) => v == '')) {
        //     return alert('Please fill in all mandatory fields!');
        // }

        // let makeField = document.querySelector('#new-make');
        // let yearField = document.querySelector('#new-year');
        // let priceField = document.querySelector('#new-price');
        // let modelField = document.querySelector('#new-model');
        // let imageField = document.querySelector('#new-image');
        // let descriptionField = document.querySelector('#new-description');

        // if (make.length < 4) {
        //     makeField.classList = 'form-control';
        //     makeField.classList.add('is-invalid');
        //     return ctx.render(createTemplate(onSubmit));

        // } else {
        //     makeField.classList = 'form-control';
        //     makeField.classList.add('is-valid');
        //     ctx.render(createTemplate(onSubmit));
        // }

        // if (model.length < 4) {
        //     modelField.classList = 'form-control';
        //     modelField.classList.add('is-invalid');
        //     return ctx.render(createTemplate(onSubmit));

        // } else {
        //     modelField.classList = 'form-control';
        //     modelField.classList.add('is-valid');
        //     ctx.render(createTemplate(onSubmit));
        // }

        // if (year < 1950 || year > 2050) {
        //     yearField.classList = 'form-control';
        //     yearField.classList.add('is-invalid');
        //     return ctx.render(createTemplate(onSubmit));

        // } else {
        //     yearField.classList = 'form-control';
        //     yearField.classList.add('is-valid');
        //     ctx.render(createTemplate(onSubmit));
        // }

        // if (description.length <= 10) {
        //     descriptionField.classList = 'form-control';
        //     descriptionField.classList.add('is-invalid');
        //     return ctx.render(createTemplate(onSubmit));

        // } else {
        //     descriptionField.classList = 'form-control';
        //     descriptionField.classList.add('is-valid');
        //     ctx.render(createTemplate(onSubmit));
        // }

        // if (price <= 0) {
        //     priceField.classList = 'form-control';
        //     priceField.classList.add('is-invalid');
        //     return ctx.render(createTemplate(onSubmit));
        // } else {
        //     priceField.classList = 'form-control';
        //     priceField.classList.add('is-valid');
        //     ctx.render(createTemplate(onSubmit));
        // }

        // if (img == '') {
        //     imageField.classList = 'form-control';
        //     imageField.classList.add('is-invalid');
        //     return ctx.render(createTemplate(onSubmit));
        // } else {
        //     imageField.classList = 'form-control';
        //     imageField.classList.add('is-valid');
        //     ctx.render(createTemplate(onSubmit));
        // }

        const isValid = validation(make, model, year, description, price, img);

        if (isValid.includes(true)) {
            ctx.render(createTemplate(onSubmit, isValid[0], isValid[1], isValid[2], isValid[3], isValid[4], isValid[5]));
            return alert('All fields are required!');
        }

        const newItem = {
            make,
            model,
            year,
            description,
            price,
            img,
            material
        };

        await createRecord(newItem);
        ctx.page.redirect('/');

    }
}

function validation(make, model, year, description, price, img) {
    let invaidPrice = false;
    let invaidModel = false;
    let invaidMake = false;
    let invaidYear = false;
    let invaidDescriprion = false;
    let invaidImg = false;

    if (price <= 0) {
        invaidPrice = true;
    }
    if (img == '') {
        invaidImg = true;
    }
    if (description.length <= 10) {
        invaidDescriprion = true;
    }
    if (year < 1950 || year > 2500) {
        invaidYear = true;
    }
    if (model.length < 4) {
        invaidModel = true;
    }
    if (make.length < 4) {
        invaidMake = true;
    }

    return [invaidPrice, invaidModel, invaidMake, invaidYear, invaidDescriprion, invaidImg];
}