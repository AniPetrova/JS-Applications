 async function lockedProfile() {
    const maindiv = document.getElementById('main');
    maindiv.innerHTML = '';

    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const response = await fetch(url);
    
    const data = await response.json();

    const array = Object.values(data);
    array.forEach(user => {

        const newEl = document.createElement('div');
        newEl.classList.add('profile');
          
           const img = document.createElement('img');
           img.src = "./iconProfile2.png";
           img.className = 'userIcon';
           newEl.appendChild(img);

           const label1 = document.createElement('label');
           label1.textContent= 'Lock ';
           newEl.appendChild(label1);

           const input1 = document.createElement('input');
           input1.type = 'radio';
           input1.name = 'user1Locked';
           input1.value = 'lock';
           input1.checked = true;
           newEl.appendChild(input1);

           const label2 = document.createElement('label');
           label2.textContent= ' Unlock ';
           newEl.appendChild(label2);

           const input2 = document.createElement('input');
           input2.type = 'radio';
           input2.name = 'user1Locked';
           input2.value = 'unlock';
           newEl.appendChild(input2);

           const br = document.createElement('br');
           newEl.appendChild(br);

           const hr = document.createElement('hr');
           newEl.appendChild(hr);

           const label3 = document.createElement('label');
           label3.textContent = 'Username';
           newEl.appendChild(label3);

           const input3 = document.createElement('input');
           input3.type = 'text';
           input3.name = 'user1Username';
           input3.value = user.username;
           input3.disabled = 'readonly';
           newEl.appendChild(input3);

           const onemorediv = document.createElement('div');
           onemorediv.id = 'user1HiddenFields';

           const newhr = document.createElement('hr');
           onemorediv.appendChild(newhr);

           const label4 = document.createElement('label');
           label4.textContent = 'Email:';
           onemorediv.appendChild(label4);

           const input4 = document.createElement('input');
           input4.type = 'email';
           input4.name = 'user1Email';
           input4.value = '';
           input4.disabled = 'readonly';
           onemorediv.appendChild(input4);

           const label5 = document.createElement('label');
           label5.textContent = 'Age:'
           onemorediv.appendChild(label5);

           const input5 = document.createElement('input');
           input5.type = 'email';
           input5.name = 'user1Age';
           input5.value = '';
           input5.disabled = 'readonly';
           onemorediv.appendChild(input5);
           
            newEl.appendChild(onemorediv)
        
        const btn = document.createElement('button');
        btn.textContent = 'Show more';
        btn.addEventListener('click', (e) => {

            if (btn.textContent == 'Show more' && input1.checked == false && input2.checked == true) {
                
            input4.value = user.email;
            input5.value = user.age;

            e.currentTarget.parentElement.children[9].style.display = 'block';   
            btn.textContent = 'Hide it';
            } else if (btn.textContent == 'Hide it' && input1.checked == false && input2.checked == true){
                
            e.currentTarget.parentElement.children[9].style.display = 'none';   
            btn.textContent = 'Show more';
            
            }
            
        });
        newEl.appendChild(btn);

         maindiv.appendChild(newEl)
    });

    
}


  
