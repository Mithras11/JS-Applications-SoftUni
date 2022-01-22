import { towns } from './towns.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const data = towns.map(x => {
    return { 'name': x, 'active': false }
});

const template = (data, matches) => html `
<article>
        <div id="towns">
            <ul>
                ${data.map(x => html `
                <li class=${ x.active ? 'active' : ''}>${x.name}</li>`)}
            </ul>
        </div>
        <input type="text" id="searchText" />
        <button @click=${search}>Search</button>
        <div id="result">${countMatches(matches)}</div>
    </article>`;

const container = document.body;

render(template(data, -1), container);


function search(event) {
   const inputField = event.target.parentNode.querySelector('#searchText');
   const input = inputField.value.toLocaleLowerCase();

   let matches = 0;

   if (input != '') {
      data.forEach(x => {
         
         if (x.name.toLocaleLowerCase().includes(input)) {
            matches++;
            x.active = true;

         } else {
            x.active = false;
         }
      });      
   }

   render(template(data, matches), container);
   inputField.value = '';
}

function countMatches(matches) {
   if (matches < 0) {
      return '';

   } else if (matches == 0) {
      return 'No matches found';
   }

   return matches == 1 ? matches + ' match found' : matches + ' matches found';
}