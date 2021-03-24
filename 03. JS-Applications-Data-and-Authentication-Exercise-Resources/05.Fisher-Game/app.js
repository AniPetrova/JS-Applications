function attachEvents() {
   document.querySelector('.load').addEventListener('click', findALl);
   const catches =  document.getElementById('catches');
   const addForm = document.getElementById('addForm').children;
   addForm[13].disabled = false;
   addForm[13].addEventListener('click', createNew);
  
}

attachEvents();

async function findALl() {
const response = await fetch('http://localhost:3030/data/catches');
const data = await response.json();
const fill = data.map(loadObjects).join('');
catches.innerHTML = fill;

}

function loadObjects(obj) {
   const result = `<div class="catch">
                    <label>Angler</label>
                    <input type="text" class="angler" value="${obj.angler}" />
                    <hr>
                    <label>Weight</label>
                    <input type="number" class="weight" value="${obj.weight}" />
                    <hr>
                    <label>Species</label>
                    <input type="text" class="species" value="${obj.species}" />
                    <hr>
                    <label>Location</label>
                    <input type="text" class="location" value="${obj.location}" />
                    <hr>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${obj.bait}" />
                    <hr>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${obj.captureTime}" />
                    <hr>
                    <button disabled class="update">Update</button>
                    <button disabled class="delete">Delete</button>
                </div>`;

   return result;
}

async function createNew(event) {
   event.preventDefault();
   
   const addForm = document.getElementById('addForm').children;

   const newObj  =  {

      angler: addForm[2].value,
      weight: addForm[4].value,
      species: addForm[6].value,
      location: addForm[8].value,
      bait: addForm[10].value,
      captureTime: addForm[12].value   
   }


   await fetch('http://localhost:3030/data/catches', {
      method: 'post',
     // Headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newObj)
   });

   findALl();

}

