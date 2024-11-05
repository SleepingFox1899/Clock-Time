const timeElement = document.getElementById("time");
const weatherElement = document.getElementById("weather");

function updateTime() {
    const now = new Date();
    const options = { timeZone: "America/New_York", hour: '2-digit', minute: '2-digit', second: '2-digit' };
    timeElement.textContent = `Current Time: ${now.toLocaleTimeString('en-US', options)}`;
}

async function fetchWeather() {
    const url = 'https://wttr.in/Belton?format=%C+%t';

    try {
        const response = await fetch(url);
        const weather = await response.text();
        weatherElement.textContent = `Current Weather: ${weather}`;
    } catch (error) {
        weatherElement.textContent = "Error fetching weather data.";
    }
}

// Update time every second
setInterval(updateTime, 1000);
// Fetch weather data every 10 minutes
fetchWeather();
setInterval(fetchWeather, 600000);

// Initial load
updateTime();
fetchWeather();
