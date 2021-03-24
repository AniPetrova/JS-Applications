async function solution() {
    const urlArt = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const urlDetails = 'http://localhost:3030/jsonstore/advanced/articles/details';
    const allArticles = document.getElementById('main');
    
    const requestForArticles = await fetch(urlArt);
    const articles = await requestForArticles.json();

    const requestForDetails = await fetch(urlDetails);
    const allDetails = await requestForDetails.json();

    const details = Object.values(allDetails);
    const ids =  Object.values(articles).map(e => e._id);
    ids.forEach(id => {
      let found = details.find(k => k._id == id);
       
      const bigdiv = document.createElement('div');
      bigdiv.className= 'accordion';
      allArticles.appendChild(bigdiv);

      const head = document.createElement('div');
      head.className = 'head';
         const span = document.createElement('span');
         span.textContent = found.title;
         head.appendChild(span);
         bigdiv.appendChild(head);

         const extra = document.createElement('div');
         extra.className = 'extra';
            const p = document.createElement('p');
            p.textContent = found.content;
            extra.appendChild(p);
         bigdiv.appendChild(extra);

         const btn = document.createElement('button');
         btn.className = 'button';
         btn.id = found._id;
         btn.textContent = 'MORE';

         btn.addEventListener('click', (e) => {
            if(btn.textContent == 'MORE') {
                e.currentTarget.parentElement.parentElement.children[1].style.display = 'block';
                btn.textContent = 'LESS';
            } else {
                e.currentTarget.parentElement.parentElement.children[1].style.display = 'none';
                btn.textContent = 'MORE';
            }
         })
         head.appendChild(btn);   
    
    });
}