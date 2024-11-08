document.addEventListener('DOMContentLoaded', function() {
    // Fetch time and weather
    function updateTime() {
        const now = new Date();
        const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('time').textContent = now.toLocaleTimeString('en-US', options);
    }

    async function updateWeather() {
        try {
            // Update the URL to get the weather in Fahrenheit
            const response = await fetch('https://wttr.in/Belton?format=%C+%t&F');
            const weather = await response.text();
            document.getElementById('weather').textContent = weather;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').textContent = 'Failed to load weather data';
        }
    }

    function refreshData() {
        updateTime();
        updateWeather();
    }

    setInterval(refreshData, 1000);
    refreshData();

    // Fullscreen functionality
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        console.log(`Orientation changed to: ${screen.orientation.angle} degrees`);
    });
});
