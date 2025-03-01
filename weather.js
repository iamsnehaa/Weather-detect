const inputval = document.querySelector("#cityinput");
const btn = document.querySelector("#add");
const city = document.querySelector("#cityoutput");
const description = document.querySelector("#description span");
const temp = document.querySelector("#temp span");
const wind = document.querySelector("#wind span");

const apik = "3045dd712ffe6e702e3245525ac7fa38";

function convertTemp(val) {
    return (val - 273.15).toFixed(2);
}

btn.addEventListener("click", async function () {
    let cityName = inputval.value.trim();
    if (!cityName) {
        alert("Please enter a city name!");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apik}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        city.innerHTML = `Weather of <span>${data.name}</span>`;
        description.innerHTML = data.weather[0].description;
        temp.innerHTML = `${convertTemp(data.main.temp)} °C`;
        wind.innerHTML = `${data.wind.speed} km/h`;

    } catch (error) {
        alert("Invalid city name. Please try again.");
    }
});
