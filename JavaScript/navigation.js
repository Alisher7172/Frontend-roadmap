// navigation.js
(function() {
    // Get current day number from URL (e.g., day3.html -> 3)
    var match = window.location.pathname.match(/day(\d+)\.html$/);
    if (!match) return;
    var currentDay = parseInt(match[1], 10);
    // Find all nav buttons
    var navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(function(btn) {
        var btnNum = parseInt(btn.textContent, 10);
        if (btnNum === currentDay) {
            btn.classList.add('nav-btn-active');
            btn.disabled = true;
            btn.style.cursor = 'default';
        } else {
            btn.classList.remove('nav-btn-active');
            btn.disabled = false;
            btn.style.cursor = 'pointer';
        }
    });
})(); 