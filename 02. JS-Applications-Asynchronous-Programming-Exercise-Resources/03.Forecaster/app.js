function attachEvents() {
    
    document.getElementById('submit').addEventListener('click', getWeather);
}

attachEvents();

async function getWeather() {

   const input = document.getElementById('location');
   const cityName = input.value;

   const code = await getCode(cityName);

   const [current, upcoming] = await Promise.all([
      getCurrent(code),
      getUpcoming(code)
   
   ])

   showforCast([current,upcoming]);

}

async function getCode(cityName) {

   const url = 'http://localhost:3030/jsonstore/forecaster/locations';
   
   const response = await fetch(url);
   const dataC = await response.json();

 
   
  return dataC.find(x => x.name.toLowerCase() == cityName.toLowerCase()).code;

}

async function getCurrent(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/'+code;;
   
    const response = await fetch(url);
    const data = await response.json();
    
   return data;

    
}

async function getUpcoming(code) {

   const url =  'http://localhost:3030/jsonstore/forecaster/upcoming/'+ code;

   const response = await fetch(url);
   const dataUp = await response.json();
   
  return dataUp;

}


function showforCast([current, upcoming]) {

   const symbols =  {
      Sunny	: `\&#x2600`,
      'Partly sunny': `\&#x26C5`,
      Overcast	: `\&#x2601`,
      Rain		: `\&#x2614`,   
      Degrees: `\&#176`
   }

  const forecastParentDiv = document.getElementById('forecast');

   forecastParentDiv.style.display = 'block';

const divCurrent = document.getElementById('current');
divCurrent.innerHTML = '';

const oldDiv = document.createElement('div');
oldDiv.setAttribute('class', 'label');
oldDiv.textContent = 'Current conditions'
divCurrent.appendChild(oldDiv);


const newDivEl = document.createElement('div');
newDivEl.setAttribute('class', 'forecasts');


    
   const condSpan = document.createElement('span');
   condSpan.setAttribute('class','condition symbol');
   condSpan.innerHTML = symbols[current.forecast.condition];

   newDivEl.appendChild(condSpan);


   const highSpan = document.createElement('span');
   highSpan.setAttribute('class', 'condition');

       const lowSpan1 = document.createElement('span');
       lowSpan1.setAttribute('class', 'forecast-data');
       lowSpan1.textContent = current.name;
       highSpan.appendChild(lowSpan1);

       
      const lowSpan2 = document.createElement('span');
       lowSpan2.setAttribute('class', 'forecast-data');
       lowSpan2.innerHTML = `${current.forecast.low}${symbols.Degrees}/${current.forecast.high}${symbols.Degrees}`;
       highSpan.appendChild(lowSpan2);

       
      const lowSpan3 = document.createElement('span');
       lowSpan3.setAttribute('class', 'forecast-data');
       lowSpan3.textContent = current.forecast.condition;
       highSpan.appendChild(lowSpan3);


   newDivEl.appendChild(highSpan);

divCurrent.appendChild(newDivEl);

const upcomingDiv  = document.getElementById('upcoming');
upcomingDiv.innerHTML = '';

const olderDiv = document.createElement('div');
olderDiv.setAttribute('class', 'label');
olderDiv.textContent = 'Three-day forecast'
upcomingDiv.appendChild(olderDiv);

const secondDiv = document.createElement('div');
secondDiv.setAttribute('class', 'forecast-info');

upcoming.forecast.forEach(day => {

   const higherSpan = document.createElement('span');
   higherSpan.setAttribute('class', 'upcoming');

    const lowSpan10 = document.createElement('span');
    lowSpan10.setAttribute('class', 'symbol');
    lowSpan10.innerHTML = symbols[day.condition];
    higherSpan.appendChild(lowSpan10);

    
   const lowSpan20 = document.createElement('span');
    lowSpan20.setAttribute('class', 'forecast-data');
    lowSpan20.innerHTML = `${day.low}${symbols.Degrees}/${day.high}${symbols.Degrees}`;
    higherSpan.appendChild(lowSpan20);

    
   const lowSpan30 = document.createElement('span');
    lowSpan30.setAttribute('class', 'forecast-data');
    lowSpan30.textContent = day.condition;
    higherSpan.appendChild(lowSpan30);


   secondDiv.appendChild(higherSpan);   
});


upcomingDiv.appendChild(secondDiv);

}