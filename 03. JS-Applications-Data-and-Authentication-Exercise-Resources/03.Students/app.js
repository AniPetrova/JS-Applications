function start() {
    getStudents();
    document.getElementById('submit').addEventListener('click', submits);
}
start();

async function getStudents() {
    const body = document.querySelector('tbody');
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const response = await fetch(url);
    const data = await response.json();
    const allStudents = Object.values(data).map(createRow).join('');
    body.innerHTML = allStudents;
}
function createRow(input) {
    const result = `
    <tr>
        <td>${input.firstName}</td>
        <td>${input.lastName}</td>
        <td>${input.facultyNumber}</td>
        <td>${input.grade}</td>
    </tr>`;
    return result;
}
async function submits(event) {
    event.preventDefault();
    const inputs = document.querySelector('.inputs').children;
    if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == '' || isNaN(inputs[3].value)) {            
        throw new Error(`Please fill all fields!`);
    }

    const newinput = {
        firstName: inputs[0].value,
        lastName: inputs[1].value,
        facultyNumber: inputs[2].value,
        grade:   inputs[3].value      
    }    

    await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newinput)
    });
    inputs[0].value = '';
    inputs[1].value = '';
    inputs[2].value = '';
    inputs[3].value = '';
    getStudents();
}