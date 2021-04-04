import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {getCatalog} from '../api/data.js';
import {main} from '../app.js';

const homeTemplate =(dataJS, dataC, dataJava, dataPython) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${dataJS.length > 0 ? dataJS.map(itemTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${dataC.length > 0 ? dataC.map(itemTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}        
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${dataJava.length > 0 ? dataJava.map(itemTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${dataPython.length > 0 ? dataPython.map(itemTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
</section>`;

const itemTemplate = (item) => html`
<article>
    <h3>${item.title}</h3>
    <p>${item.content}</p>
    <a href="/details/${item._id}" class="btn details-btn">Details</a>
</article>`; 

export async function homePage(ctx) {
    const data = await getCatalog();
    const dataJS = data.filter(element => element.category === 'JavaScript');
    const dataC = data.filter(element => element.category === 'C#');
    const dataJava = data.filter(element => element.category === 'Java');
    const dataPython = data.filter(element => element.category === 'Python');

    render(homeTemplate(dataJS, dataC, dataJava, dataPython), main);
    ctx.setUserNav();
}
