const weather = document.querySelector(".js-weather"),
    S_temperature = weather.querySelector(".temperature"),
    S_location = weather.querySelector(".location");

const API_KEY = "4bfa24e3a5ac2d52857b948fbeb76273";
const COORDS = 'coords';

const RED = "red",
    BLUE = "blue";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function (response) {
        return response.json();
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        S_temperature.innerHTML = `${temperature} ℃`;
        S_location.innerHTML = place;
        if (temperature > 19) {
            S_temperature.classList.add(RED);
            S_temperature.classList.remove(BLUE);
        } else {
            S_temperature.classList.add(BLUE);
            S_temperature.classList.remove(RED);
        }
        //weather.innerText = `${temperature}  ${place}`
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude; //위도
    const longitude = position.coords.longitude; //경도
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo  location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();