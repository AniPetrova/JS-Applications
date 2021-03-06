import {html} from '../../node_modules/lit-html/lit-html.js';
import {editRecord, getDetails} from '../api/data.js';

const editTemplate = (movie, onSubmit) => html`
<section id="edit-movie">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value="${movie.title}" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." .value="${movie.description}" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value="${movie.img}" name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>`;

export async function editPage(ctx) {
    const movieId = ctx.params.id;
    const movie = await getDetails(movieId);
    ctx.render(editTemplate(movie, onSubmit));   

    async function onSubmit(event) {
        event.preventDefault();
     const formData = new FormData(event.target)
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');
                
        if (!title || !description || !img) {
            return alert('All fields are required.');
        }
        await editRecord(movie._id, {title, description, img});
        ctx.setUserNav();
        ctx.page.redirect('/details/' +movie._id);
    }
}
