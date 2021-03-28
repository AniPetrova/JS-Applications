import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {createRecord} from '../api/data.js';
import {notify} from '../notification.js';
        
const createTemplate = (onSubmit) => html`
<section class="user" id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))

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
            throw new Error('All fields are required!')
            }
              await createRecord(data);
             ctx.page.redirect('/allMemes');
          } catch (error){
              notify(error.message)

    }
    }
}