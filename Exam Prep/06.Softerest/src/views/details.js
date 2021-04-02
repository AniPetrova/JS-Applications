import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {getDetails, deleteItem} from '../api/data.js';

const detailsTemplate = (idea, isOwner, onDelete) => html`
<div class="container home some">
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    ${isOwner ? html`
    <div class="text-center">
        <a @click=${onDelete} class="btn detb" href="/catalog">Delete</a>
    </div>` : ''}
</div>`;

export async function detailsPage(ctx) {
    const  ideaId = ctx.params.id;
    const idea = await getDetails(ideaId);
    const myId = sessionStorage.getItem('userId');

    ctx.render(detailsTemplate(idea, myId===idea._ownerId, onDelete))

    async function onDelete() {
       await deleteItem(idea._id);
       ctx.setUserNav();
       ctx.page.redirect('/catalog');
    }
}