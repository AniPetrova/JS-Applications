import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {editDetails, getDetails} from '../api/data.js';

const editTemplate = (editItem, onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit = ${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" value=${editItem.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" value=${editItem.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${editItem.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description" value=${editItem.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" value=${editItem.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" value=${editItem.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value=${editItem.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const editItem = await getDetails(id);

    ctx.render(editTemplate(editItem, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        
        const data = {
            make: formData.get('make'),
            model: formData.get('model'),
            year: Number(formData.get('year')),
            description: formData.get('description'),
            price: Number(formData.get('price')),
            img: formData.get('img'),
            material: formData.get('material')
        }

        if(data.make =='' || data.model =='' || data.year == '' || data.description == '' || data.price =='' || data.img == ''){
            return alert('Missing fields!')
        }


        await editDetails(id, data);
        ctx.page.redirect('/');
    

    }
}