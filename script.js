document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    if (!hamburger || !navLinks || !darkModeToggle || !body) {
        console.error('One or more required elements are missing from the DOM.');
        return;
    }

    const toggleNav = () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    };

    hamburger.addEventListener('click', toggleNav);

    hamburger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleNav();
        }
    });


    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        }
    });

    const toggleDarkMode = () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    };


    darkModeToggle.addEventListener('click', toggleDarkMode);


    darkModeToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDarkMode();
        }
    });

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
        darkModeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
    }


    if (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode();
    }


    hamburger.setAttribute('aria-expanded', false);
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');


    console.log('Enhanced script loaded successfully.');
});