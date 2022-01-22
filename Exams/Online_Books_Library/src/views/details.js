import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById } from "../api/data.js";
import { deleteRecord } from "../api/data.js";

const detailsTemplate = (item, isOwner, onDelete) => html `
<section id="details-page" class="details">
  <div class="book-information">
    <h3>${item.title}</h3>
    <p class="type">Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl} /></p>
    <div class="actions">
    ${isOwner ? html `
        <a class="button" href=${`/edit/${item._id}`}>Edit</a>
        <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>` : ''}
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${item.description}</p>
  </div>
</section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id; //!!!
    const item = await getById(id);

  const userId = sessionStorage.getItem("userId");
  
      ctx.render(detailsTemplate(item, (item._ownerId == userId), onDelete));

    async function onDelete() {
        const confirmed = confirm("Are you sure you want to delete this item?");

        if (confirmed) {
            await deleteRecord(item._id);
            ctx.page.redirect("/dashboard");
        }
  }
  
}