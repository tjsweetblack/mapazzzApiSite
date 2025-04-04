const zonasList = document.getElementById('zonas-list');

async function fetchZonas() {
    try {
        zonasList.innerHTML = '<p class="loading">Carregando zonas de risco...</p>';
        const response = await fetch('https://mapazzz-api.vercel.app/api/reportagens/zonas');
        if (!response.ok) throw new Error('Erro ao carregar dados');
        const data = await response.json();

        zonasList.innerHTML = '';
        data.forEach((zona, index) => {
            const zonaItem = document.createElement('div');
            zonaItem.classList.add('zona-item');
            zonaItem.style.animationDelay = `${index * 0.1}s`; // Animação escalonada
            const riskText = zona.riskLevel === 1 ? 'Baixo' : 'Desconhecido'; // Ajuste conforme níveis reais
            zonaItem.innerHTML = `
                <h3>${zona.location}</h3>
                <p>Risco: <span class="risk-${riskText.toLowerCase()}">${riskText}</span></p>
                <p>Longitude: ${zona.longitude}</p>
                <p>Latitude: ${zona.latitude}</p> <!-- Como não há latitude nos dados -->
            `;
            zonasList.appendChild(zonaItem);
        });
    } catch (error) {
        zonasList.innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
}

fetchZonas();

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
