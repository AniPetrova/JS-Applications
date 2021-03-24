function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', getALlRecords);
    document.getElementById('btnCreate').addEventListener('click', createNewRecord);
    document.getElementById('phonebook').addEventListener('click', predelete);
} 

attachEvents();

async function getALlRecords() {
    
  const response = await fetch('http://localhost:3030/jsonstore/phonebook');
  const allRecords = await response.json();
  const keys = Object.entries(allRecords).map(createLi).join('');
  document.getElementById('phonebook').innerHTML = keys;  
}

function createLi([id, record]) {
    const result = `
    <li data-id="${id}">${record.person}: ${record.phone}               
        <button class = "deleteBtn">Delete</button>      
    </li>`;   
     return result;
}

async function createNewRecord(){
        // event.preventDefault();
        const newPerson = document.getElementById('person');
        const newPhone = document.getElementById('phone');
        const record = {
            person: newPerson.value,
            phone: newPhone.value
        }
     await fetch('http://localhost:3030/jsonstore/phonebook',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(record)
        });
        newPerson.value = '';
        newPhone.value = '';
        getALlRecords();             
}

function predelete(event) {
    event.preventDefault(); 
    const confirmation = confirm(`Are you sure?`)
    if (confirmation) {
    const id = event.target.parentNode.dataset.id;    
    deleteRecord(id);
    }
}

async function deleteRecord(id) {
    await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
        method: 'delete',
    });
    getALlRecords();
}