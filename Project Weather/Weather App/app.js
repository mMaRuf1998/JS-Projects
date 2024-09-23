

const form = document.querySelector('.form');
const infoButton = document.querySelector('.infoButton');
const locationInput = document.querySelector('.location');
const h3 = document.querySelector('h3');
const container = document.querySelector('.container');
const errorMsg = document.createElement('p');

var lat, lon;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cards = document.querySelectorAll('.card');
    if (cards) {
        for (let card of cards)
            card.remove();
    }

    getData(locationInput.value);
    locationInput.value = "";

})

const getData = async (userData) => {
    try {

        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${userData}&limit=5&appid=4c8f69fefb32bd67bb8aab2f17c32ebf`);

        for (let datas in res.data) {

            await getWeatherInfo(res.data[datas].name, res.data[datas].country, res.data[datas].state, res.data[datas].lat, res.data[datas].lon);

        }
    }
    catch (e) {
        errorMsg.innerText = "Please Reload ";
        container.append(errorMsg);
        console.log(" Something Wrong Happened !", e);
    }
}

const getWeatherInfo = async (name, country, state, lat, lon) => {

    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=4c8f69fefb32bd67bb8aab2f17c32ebf`);
        await dataPosting(name, country, state, res.data.main.temp, res.data.main.feels_like, res.data.main.temp_max, res.data.main.temp_min, res.data.main.humidity);

    }
    catch (e) {
        errorMsg.innerText = "Please Reload ";
        container.append(errorMsg);
        console.log("Weather Update Failed", e);
    }
}


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


    const p1 = document.createElement('p');
    p1.innerHTML = `Current Temperature : <b>${temp}</b> `;
    const p2 = document.createElement('p');
    p2.innerHTML = `Feels Like : ${feels_like} `;
    const p3 = document.createElement('p');
    p3.innerHTML = `Highest Temperature ${temp_max} `;
    const p4 = document.createElement('p');
    p4.innerHTML = `Lowest Temperature ${temp_min} `;
    const p5 = document.createElement('p');
    p5.innerHTML = `Humidity : ${humidity} `;
    const p6 = document.createElement('p');


    content.append(locationName, stateName, countryName, p1, p2, p3, p4, p5, p6);
    cardBody.append(content);
    card.append(cardBody);
    container.append(card);
}

