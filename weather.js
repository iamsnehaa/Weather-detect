document.addEventListener("DOMContentLoaded", function () {
  const inputval = document.querySelector("#cityinput");
  const btn = document.querySelector("#add");
  const city = document.querySelector("#cityoutput");
  const description = document.querySelector("#description");
  const temp = document.querySelector("#temp");
  const wind = document.querySelector("#wind");
  const weatherCard = document.querySelector(".weather-card"); // Get the weather card
  const weatherIcon = document.querySelector("#weather-icon"); // Weather icon
  const loading = document.querySelector("#loading"); // Loading indicator

  const apiKey = "ba1fc243e7ace66beba7490367b995bc";
  
  if (!btn) {
      console.error("Button with ID 'add' not found.");
      return;
  }

  btn.addEventListener("click", async function () {
      let cityName = inputval.value.trim();
      if (!cityName) {
          alert("Please enter a city name!");
          return;
      }

      try {
          loading.classList.remove("hidden"); // Show loading indicator
          weatherCard.classList.add("hidden"); // Hide weather card while loading
          
          const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
          );

          if (!response.ok) {
              throw new Error("City not found");
          }

          const data = await response.json();

          // Populate UI elements with API data
          city.innerHTML = `Weather of <span>${data.name}</span>`;
          description.innerHTML = `Sky Conditions: <span>${data.weather[0].description}</span>`;
          temp.innerHTML = `Temperature: <span>${data.main.temp} °C</span>`;
          wind.innerHTML = `Wind Speed: <span>${data.wind.speed} km/h</span>`;

          // Update weather icon
          const iconCode = data.weather[0].icon;
          weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
          weatherIcon.alt = data.weather[0].description;

          // Show the weather card
          weatherCard.classList.remove("hidden");
      } catch (error) {
          alert("Invalid city name. Please try again.");
      } finally {
          loading.classList.add("hidden"); // Hide loading indicator after fetching
      }
  });
});
