 import { html, render } from './node_modules/lit-html/lit-html.js';

 const template = (data) => html `
     <ul>
         ${data.map(x=> html `<li>${x}</li>`)}
     </ul>`;

 const container = document.querySelector('#root');

 document.querySelector('#btnLoadTowns').addEventListener('click', onClick);

 function onClick(event) {
    event.preventDefault();

    const input = document.querySelector('#towns');    
    const towns = input.value.split(', ').map(e => e.trim()).filter(e => e != '');

    render(template(towns), container);
    input.value='';
     
 }