document.addEventListener("DOMContentLoaded", function () {
    const inputval = document.querySelector("#cityinput");
    const btn = document.querySelector("#add");
    const city = document.querySelector("#cityoutput");
    const description = document.querySelector("#description");
    const temp = document.querySelector("#temp");
    const wind = document.querySelector("#wind");
    const weatherCard = document.querySelector(".weather-card");
    const weatherIcon = document.querySelector("#weather-icon");
    const loading = document.querySelector("#loading");
  
    const apiKey = "ba1fc243e7ace66beba7490367b995bc";
  
    btn.addEventListener("click", async function () {
        let cityName = inputval.value.trim();
        if (!cityName) {
            alert("Please enter a city name!");
            return;
        }
  
        try {
            loading.classList.remove("hidden");
            weatherCard.classList.remove("show"); // Hide while loading
            weatherCard.classList.add("hidden");
  
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
            );
  
            if (!response.ok) {
                throw new Error("City not found");
            }
  
            const data = await response.json();
  
            city.innerHTML = `Weather in <span>${data.name}</span>`;
            description.innerHTML = `Sky: <span>${data.weather[0].description}</span>`;
            temp.innerHTML = `Temperature: <span>${data.main.temp} °C</span>`;
            wind.innerHTML = `Wind Speed: <span>${data.wind.speed} km/h</span>`;
  
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
  
            weatherCard.classList.remove("hidden");
            setTimeout(() => {
                weatherCard.classList.add("show");
            }, 100);
  
        } catch (error) {
            alert("Invalid city name. Please try again.");
        } finally {
            loading.classList.add("hidden");
        }
    });
  });
  