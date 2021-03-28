import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {getMineCatalog, getUserDetails} from '../api/data.js';

const profileTemplate = (user) => html`
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
    <div class="user-content">
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>My memes count: ${user.count}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    ${user.count>0 ?
    user.memes.map(memTempl) : 
    html`<p class="no-memes">No memes in database.</p>`}
</div>
</section>  `;

const memTempl = (mem) => html`
<div class="user-meme">
    <p class="user-meme-title">${mem.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${mem.imageUrl}>
    <a class="button" href="/details/${mem._id}">Details</a>
</div>`;

export async function profilePage(ctx) {
    const id = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const username = sessionStorage.getItem('username');
    const memes= await getMineCatalog();
    const count = memes.length;
    const gender = sessionStorage.getItem('gender')
    

    const user = {
        id: id,
        email: email,
        username: username,
        memes: memes,
        count: count,
        gender: gender,

    }   

    ctx.render(profileTemplate(user));
    

}