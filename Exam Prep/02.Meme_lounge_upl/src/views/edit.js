
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {editRecord, getDetails} from '../api/data.js';
import {notify} from '../notification.js';

const editTemplate = (meme, onSubmit) => html`
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;


export async function editPage(ctx) {
    const id = ctx.params.id;
    const meme = await getDetails(id);
    ctx.render(editTemplate(meme, onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
        }

        try {

            if (!data.title || !data.description || !data.imageUrl) {
                throw new Error('All fields are required!');
            }
            await editRecord(meme._id, data);
            ctx.setUserNav();
            ctx.page.redirect(`/details/${meme._id}`);
        } catch (error) {
            notify(error.message);
        }
    }
}