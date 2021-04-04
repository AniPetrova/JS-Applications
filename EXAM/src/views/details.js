import {html} from '../../node_modules/lit-html/lit-html.js';
import {getDetails, deleteItem, } from '../api/data.js';

const detailsTemplate = (article, isOwner, onDelete) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">
            ${isOwner ?html`
            <a @click=${onDelete} href="#" class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>
            <a href="/" class="btn edit">Back</a>` : html`
            <a href="/" class="btn edit">Back</a>`}
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const articleId = ctx.params.id;
    const article = await getDetails(articleId);
    const myId = sessionStorage.getItem('userId');

    
    ctx.render(detailsTemplate(article, myId===article._ownerId, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteItem(article._id);            
            ctx.page.redirect('/');
        }
    }


}