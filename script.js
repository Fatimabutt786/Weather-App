// Your API key
const apiKey = "9521402d676840c796f190640250904";

// Get references to the DOM elements
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherInfo = document.getElementById('weather-info');
const errorDiv = document.getElementById('error');

// Function to fetch weather data from the API
async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        
        if (data.error) {
            weatherInfo.innerHTML = "";
            errorDiv.textContent = "City not found. Please try again.";
            return;
        }

        
        errorDiv.textContent = "";
        const tempCelsius = data.current.temp_c; 
        const condition = data.current.condition.text; 
        const humidity = data.current.humidity; 
        const windSpeed = data.current.wind_kph; 

        weatherInfo.innerHTML = `
            <p><strong>Temperature:</strong> ${tempCelsius}°C</p>
            <p><strong>Condition:</strong> ${condition}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
        `;
    } catch (error) {
        errorDiv.textContent = "Something went wrong. Please try again.";
    }
}


getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    } else {
        errorDiv.textContent = "Please enter a city name.";
        weatherInfo.innerHTML = "";
    }
});

// Optional: Add the same functionality when the user presses Enter in the input field
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeatherBtn.click();
    }
});
