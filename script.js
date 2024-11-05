async function fetchWeather() {
  const weatherElement = document.getElementById("weather");
  
  const url = 'https://wttr.in/Belton?format=%C+%t'; // Weather condition and temperature
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not available");
    
    const data = await response.text();
    weatherElement.innerText = data; // Display the weather data
  } catch (error) {
    weatherElement.innerText = "Weather data unavailable";
    console.error("Weather fetch error:", error);
  }
}

function updateTime() {
  const timeElement = document.getElementById("time");

  // Get the current time in the Eastern Time Zone
  const now = new Date();
  const options = { timeZone: "America/New_York", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const timeString = new Intl.DateTimeFormat("en-US", options).format(now);

  timeElement.innerText = timeString;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();  // Initial call to set time immediately

// Fetch weather data once on load
fetchWeather();
