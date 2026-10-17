const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if(!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBranding.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

        showMenu = true;
    } else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBranding.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));

        showMenu = false;
    }
}

function copyText(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        const tooltip = element.querySelector('.tooltip');

        tooltip.innerText = "Copied!";
        tooltip.style.backgroundColor = "#fff";

        setTimeout(() => {
            tooltip.innerText = "Click to copy";
            tooltip.style.backgroundColor = "";
        }, 600);

    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Theme switcher (w persistence)
const themeBtn = document.querySelector('#theme-toggle');

// Check if the user already chose Light Mode on a previous page first
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}

if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
        const switchTheme = () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        };

        if (!document.startViewTransition) {
            switchTheme();
            return;
        }

        const rect = themeBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        document.documentElement.style.setProperty('--click-x', `${centerX}px`);
        document.documentElement.style.setProperty('--click-y', `${centerY}px`);

        document.startViewTransition(() => switchTheme());
    });
}