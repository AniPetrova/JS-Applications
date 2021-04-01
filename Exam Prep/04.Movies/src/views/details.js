import {html} from '../../node_modules/lit-html/lit-html.js';
import {getDetails, deleteItem, setLike, getLikes, getOwnLikes} from '../api/data.js';

const detailsTemplate = (movie, isOwner, onDelete, onLike, ownLikes, likes) => html`
<section id="movie-example">
<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>
        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">${movie.description}</p>            
            ${isOwner ? html`
            <a @click=${onDelete} class="btn btn-danger" href="#">Delete</a>
            <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>` : 
             ownLikes.length==1 ? '' : html`
            <a @click=${onLike} class="btn btn-primary" href="#">Like</a>`}

            <span class="enrolled-span">${likes} like${likes>1 ? 's' : ''}</span>
        </div>
    </div>
</div>
</section>`;

export async function detailsPage(ctx) {
    const movieId = ctx.params.id;
    const movie = await getDetails(movieId);
    const myId = sessionStorage.getItem('userId');
    const likes = await getLikes(movie._id);
    const ownLikes = await getOwnLikes(movie._id);
    
    ctx.render(detailsTemplate(movie, myId===movie._ownerId, onDelete, onLike, ownLikes, likes));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteItem(movie._id);            
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        
        await setLike({movieId: movie._id});        
        ctx.page.redirect('/details/' + movie._id)

    }    
}