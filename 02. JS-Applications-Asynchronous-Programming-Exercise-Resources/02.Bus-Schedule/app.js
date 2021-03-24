function solve() {

    const departbtn = document.getElementById('depart');
    const arrivebtn = document.getElementById('arrive');
    const banner = document.querySelector('#info span');
    let next = {
        next: 'depot'
    }

   async function depart() {
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + next.next;
        const response = await fetch(url);
        const data = await response.json();

        next = data;
        banner.textContent = `Next stop ${next.name}`

        departbtn.disabled = true;
        arrivebtn.disabled = false;
    }

    function arrive() {

        banner.textContent = `Arriving at ${next.name}`;

        departbtn.disabled = false;
        arrivebtn.disabled = true;
       }

    return {
        depart,
        arrive
    };
}

let result = solve();