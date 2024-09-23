

const form = document.querySelector('.form');
const infoButton = document.querySelector('.infoButton');
const locationInput = document.querySelector('.location');
const h3 = document.querySelector('h3');
const container = document.querySelector('.container');
var lat, lon;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cards = document.querySelectorAll('.card');
    if (cards) {
        for (let card of cards)
            card.remove();
    }

    getData(locationInput.value);

})

const getData = async (userData) => {
    try {

        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${userData}&limit=5&appid=4c8f69fefb32bd67bb8aab2f17c32ebf`);

        for (let datas in res.data) {

            await getWeatherInfo(res.data[datas].name, res.data[datas].country, res.data[datas].state, res.data[datas].lat, res.data[datas].lon);

        }
    }
    catch (e) {
        console.log(" Something Wrong Happened !", e);
    }
}

const getWeatherInfo = async (name, country, state, lat, lon) => {

    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=4c8f69fefb32bd67bb8aab2f17c32ebf`);
        await dataPosting(name, country, state, res.data.main.temp, res.data.main.feels_like, res.data.main.temp_max, res.data.main.temp_min, res.data.main.humidity);

    }
    catch (e) {
        console.log("Weather Update Failed", e);
    }
}
/*
"lat": 51.5073219,
        "lon": -0.1276474,
*/

function dataPosting(name, country, state, temp, feels_like, temp_max, temp_min, humidity) {

    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    card.classList.add('card');
    cardBody.classList.add('card-body');

    const content = document.createElement('div');
    const h3 = document.createElement('h3');
    content.classList.add("content");
    var countryName, stateName, locationName;

    if (name) {
        locationName = document.createElement('h4');
        locationName.innerHTML = `${name}'s Weather Today`;
    }
    if (country) {
        countryName = document.createElement('h4');
        countryName.innerHTML = `Country : ${country} `;
    }

    if (state) {
        stateName = document.createElement('h4');
        stateName.innerHTML = `State : ${state}`;
    }

    const ulContainer = document.createElement('ul');

    const li1 = document.createElement('LI');
    li1.innerHTML = `Current Temperature : <b>${temp}</b> `;
    const li2 = document.createElement('LI');
    li2.innerHTML = `Feels Like : ${feels_like} `;
    const li3 = document.createElement('LI');
    li3.innerHTML = `Highest Temperature ${temp_max} `;
    const li4 = document.createElement('LI');
    li4.innerHTML = `Lowest Temperature ${temp_min} `;
    const li5 = document.createElement('LI');
    li5.innerHTML = `Humidity : ${humidity} `;
    const li6 = document.createElement('LI');


    ulContainer.append(li1, li2, li3, li4, li5);
    content.append(locationName, stateName, countryName, ulContainer);
    cardBody.append(content);
    card.append(cardBody);
    container.append(card);
}



// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=218570f08a242b6a7b186889d1719056


// This is for lattitude and longitude of the city .
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=bd5e378503939ddaee76f12ad7a97608


// bd5e378503939ddaee76f12ad7a97608


// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=bd5e378503939ddaee76f12ad7a97608