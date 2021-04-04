import {html} from '../../node_modules/lit-html/lit-html.js';
import {getBySearch} from '../api/data.js';

const searchTemplate = (data, onClick) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit = ${onClick} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">       
        ${data.length > 0 ? data.map(itemTemplate) : html`<h3 class="no-articles">No matching articles</h3>`}
    </div>
</section>`;

const itemTemplate = (item) => html`
<a class="article-preview" href="/details/${item._id}">
    <article>
        <h3>Topic: <span>${item.title}</span></h3>
        <p>Category: <span>${item.category}</span></p>
    </article>
</a>`; 

export async function searchArticlesPage(ctx) {
    ctx.render(searchTemplate([], onClick));

    async function onClick(event) {
        event.preventDefault();
       
        const formData = new FormData(event.target);
        const query = formData.get('search')
      
        if (!query) {
            return alert('Please enter search criteria.')
        }        
        const data = await getBySearch(query);
         
        ctx.render(searchTemplate(data, onClick));
        
    }
}