async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        allert(error.message);
        throw new Error(error.message);}

    const data = await response.json();
    return data;
}
async function getAllBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    const rows = Object.entries(books).map(createrow).join('');
    document.querySelector('tbody').innerHTML = rows;
}

function createrow([id, book]) {
    const result = `
    <tr data-id="${id}">
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>
            <button class ="editBtn">Edit</button>
            <button class = "deleteBtn">Delete</button>
         </td>
    </tr>`;   
     return result;
}

async function createBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }
 await request('http://localhost:3030/jsonstore/collections/books',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    });
   event.target.reset();
   getAllBooks();
}

async function updateB(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    });
    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    event.target.reset();
    getAllBooks();
}

async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });
    getAllBooks();
}

function start() {
document.getElementById('loadBooks').addEventListener('click', getAllBooks);

document.getElementById('createForm').addEventListener('submit', createBook);
document.getElementById('editForm').addEventListener('submit', updateB);
document.querySelector('#editForm [type = "button"]').addEventListener('click', (event)=> {
    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    event.target.reset();
})

document.querySelector('table').addEventListener('click', handleTable);
getAllBooks();
}
start();

function handleTable(event) {    

    if(event.target.className == 'editBtn') {
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';

        const bookid = event.target.parentNode.parentNode.dataset.id;
        loadbook(bookid);
        

    } else if (event.target.className == 'deleteBtn') {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            const bookid = event.target.parentNode.parentNode.dataset.id;
            deleteBook(bookid);
         }
    }
}

async function loadbook(id) {
   const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
   document.querySelector('#editForm [name="id"').value = id;
   document.querySelector('#editForm [name="title"]').value = book.title;   
   document.querySelector('#editForm [name="author"]').value = book.author;
}