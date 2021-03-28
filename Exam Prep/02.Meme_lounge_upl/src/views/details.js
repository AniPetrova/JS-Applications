import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {getDetails, deleteItem} from '../api/data.js';

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>
              
            ${isOwner ? html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` : ''}            
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const meme = await getDetails(id);
    const myId = sessionStorage.getItem('userId');

    ctx.render(detailsTemplate(meme, myId===meme._ownerId, onDelete));
    
    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (confirmed){
            deleteItem(meme._id);
            ctx.page.redirect('/allMemes');
        }
    }


}