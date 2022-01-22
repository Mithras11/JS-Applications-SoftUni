import { html, render } from './node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const container = document.querySelector('div');
let cities;

const template = (data) => html `
    <select id="menu">
        ${data.map(x => html`<option value=${x._id}>${x.text}</option>`)}
    </select>`;


start();


//------functions----//

function start() {
    document.querySelector('form').addEventListener('submit', addItem);
    renderCities();    
}     



async function renderCities() {
    cities = await getAllCities();
    render(template(cities), container);
}
 

async function addItem(event) {
    event.preventDefault();

    const inputField = event.target.parentNode.querySelector('#itemText');
    const newCity = inputField.value;

    console.log(newCity);

    await postNewCity(newCity);
    inputField.value = '';

    renderCities();
}

async function getAllCities() {
    const response = await fetch(url);

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    return Object.values(data);
}

async function postNewCity(text) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({text})
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }
}