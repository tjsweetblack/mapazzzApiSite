// Menu Hamburger
const menuIcon = document.getElementById('menu-icon');
const navList = document.querySelector('.nav_list');

menuIcon.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});