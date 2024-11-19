document.addEventListener('DOMContentLoaded', function() {
    const blockTimes = [
        { name: 'Social Studies', start: '08:00', end: '09:03', themeClass: 'block-social-studies' },
        { name: 'ELA', start: '09:03', end: '10:03', themeClass: 'block-ela' },
        { name: 'Math', start: '10:03', end: '11:03', themeClass: 'block-math' },
        { name: 'Science', start: '11:03', end: '12:07', themeClass: 'block-science' },
        { name: 'WIN Time', start: '12:07', end: '13:20', themeClass: 'block-win' },
        { name: 'Gym', start: '13:20', end: '14:20', themeClass: 'block-gym' },
        { name: 'Spanish', start: '14:20', end: '15:00', themeClass: 'block-spanish' },
    ];

    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        // Update the current block and theme based on time
        let currentBlock = 'School is out';
        let currentClass = '';

        blockTimes.forEach(block => {
            if (formattedTime >= block.start && formattedTime < block.end) {
                currentBlock = block.name;
                currentClass = block.themeClass;
            }
        });

        document.getElementById('current-block').textContent = `Current Block: ${currentBlock}`;
        document.body.className = currentClass; // Change theme
    }

    // Update the block every minute
    setInterval(updateTime, 60000);
    updateTime(); // Initial call to set the current block immediately

    // Fetch time and weather
    function updateTimeDisplay() {
        const now = new Date();
        const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('time').textContent = now.toLocaleTimeString('en-US', options);
    }

    async function updateWeather() {
        try {
            const response = await fetch('https://wttr.in/Belton?format=%C+%t&F');
            const weather = await response.text();
            document.getElementById('weather').textContent = weather;
        } catch (error) {
            document.getElementById('weather').textContent = 'Failed to load weather data';
        }
    }

    function refreshData() {
        updateTimeDisplay();
        updateWeather();
    }

    setInterval(refreshData, 1000);
    refreshData();

    // Fullscreen functionality
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error(err));
        } else {
            document.exitFullscreen();
        }
    });
});
