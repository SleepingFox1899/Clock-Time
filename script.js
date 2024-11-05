async function fetchWeather() {
  console.log("Fetching weather data...");
  const weatherElement = document.getElementById("weather");
  
  const url = 'https://wttr.in/Belton?format=%C+%t'; // Weather condition and temperature
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not available");
    
    const data = await response.text();
    weatherElement.innerText = data; // Display the weather data
  } catch (error) {
    weatherElement.innerText = "Weather data unavailable";
    console.error(error);
  }
}
