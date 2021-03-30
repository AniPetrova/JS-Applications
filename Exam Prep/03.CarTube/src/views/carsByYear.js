import {html} from '../../node_modules/lit-html/lit-html.js';
import {getCatalogByYear} from '../api/data.js';

const searchTemplate = (data, onClick) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="searchedYear" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onClick} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">
     ${data.length>0 ?
     data.map(carTemplate) : html`<p class="no-cars"> No results.</p>`}
    </div>

</section>`;



const carTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function carsByYearPage(ctx) {
    ctx.render(searchTemplate([], onClick));

    async function onClick(event) {
        event.preventDefault();
        
        const year = Number(document.getElementById('searchedYear').value);
        if (!year) {
            return alert('Please enter search criteria.')
        }
        
        const data = await getCatalogByYear(year);
        
        ctx.render(searchTemplate(data, onClick));
        ctx.page.redirect('/search?query=' + year);
        
    }
}