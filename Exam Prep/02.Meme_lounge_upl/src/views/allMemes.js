import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {getCatalog} from '../api/data.js';
import {main} from '../app.js';


const memesTemplate = (data ) => html`
<section class="user" id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
				${data.length>0 ?
                data.map(memTemplate) : 
                html`<p class="no-memes">No memes in database.</p>`}				
			</div>
        </section>`;

const memTemplate = (item) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${item.title}</p>
            <img class="meme-image" alt="meme-img" src="${item.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${item._id}">Details</a>
        </div>
    </div>
</div>`;

export async function allMemesPage(ctx) {
    const data = await getCatalog();

    render(memesTemplate(data), main);
    ctx.setUserNav();

}

