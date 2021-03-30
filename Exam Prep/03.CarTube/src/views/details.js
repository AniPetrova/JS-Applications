import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { getDetails, deleteItem } from '../api/data.js';


const detailsTemplate = (car, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>
        <p class="description-para">${car.description}</p>
        
        ${isOwner ? html`
        <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" @click =${onDelete} class="button-list">Delete</a>` : ''}
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    
    const id = ctx.params.id;   
    const car = await getDetails(id);
    
    const owner = car._ownerId;
   
    const myId = sessionStorage.getItem('userId');
 

    ctx.render(detailsTemplate(car, owner === myId, onDelete));
 

    async function onDelete() {
         const confirmed = confirm('Are you sure you want to delete?');
         if (confirmed) {
             await deleteItem(car._id);
             ctx.page.redirect('/allCars');
         }
    }
}

    
