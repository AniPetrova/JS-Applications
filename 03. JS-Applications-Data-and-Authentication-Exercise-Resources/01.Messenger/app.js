function attachEvents() {
    document.getElementById('submit').addEventListener('click', async () => {
        const author = document.getElementById('controls').children[1].value;
        const content = document.getElementById('controls').children[4].value;

        await post({author, content});
       document.getElementById('controls').children[1].value = '';
       document.getElementById('controls').children[4].value = '';
       getMessages();
    });

    document.getElementById('refresh').addEventListener('click', getMessages);
    getMessages();
}
attachEvents();

async function getMessages() {
 const response = await fetch ('http://localhost:3030/jsonstore/messenger');
 const data = await response.json();
 const all =  Object.values(data).map(e => `${e.author}: ${e.content}`).join('\n');
 document.getElementById('messages').value = all;
}

async function post(author, content) {
    await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(author, content)
    });  
}