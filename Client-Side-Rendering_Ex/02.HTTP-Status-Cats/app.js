import { cats } from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';

cats.forEach(c => c.isVisible = false);

const catTemplate = (cats) => html `
    <ul @click=${toggle}>
    ${cats.map(cat => html`
                <li>
                    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                    <div class="info">
                        <button class="showBtn">${!cat.isVisible ? 'Show' : 'Hide'} status code</button>
                        <div class="status"  style=${styleMap(cat.isVisible? {}:{display: 'none'})} id=${cat.id}>
                            <h4>Status Code: ${cat.statusCode}</h4>
                            <p>${cat.statusMessage}</p>
                        </div>
                    </div>
                </li>`)}
    </ul>`;

const container = document.querySelector('#allCats');

render(catTemplate(cats), container);

function toggle(event) {
    
    if (event.target.classList.contains('showBtn')) {
        const id = event.target.parentNode.querySelector('.status').id;
        const currCat = cats.find(c => c.id == id);

        currCat.isVisible = !currCat.isVisible;

        render(catTemplate(cats), container);        
    }
}