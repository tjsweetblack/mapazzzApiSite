const reportagensList = document.getElementById('reportagens-list');

async function fetchReportagens() {
    try {
        console.log('Iniciando requisição à API...');
        reportagensList.innerHTML = '<p class="loading">Carregando reportagens...</p>';

        const response = await fetch('https://mapazzz-api.vercel.app/api/reportagens');
        console.log('Resposta recebida:', response);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        reportagensList.innerHTML = '';
        if (data.length === 0) {
            reportagensList.innerHTML = '<p>Nenhuma reportagem encontrada.</p>';
            return;
        }

        data.forEach((reportagem, index) => {
            const reportagemItem = document.createElement('div');
            reportagemItem.classList.add('reportagem-item');
            reportagemItem.style.animationDelay = `${index * 0.1}s`;
            const riskText = reportagem.riskLevel === 1 ? 'Baixo' : 'Desconhecido';
            reportagemItem.innerHTML = `
                <img src="${reportagem.imageUrl}" alt="${reportagem.title}" class="reportagem-img">
                <h3>${reportagem.title}</h3>
                <p><strong>Descrição:</strong> ${reportagem.description}</p>
                <p><strong>Localização:</strong> ${reportagem.location}</p>
                <p><strong>Coordenadas:</strong> ${reportagem.latitude}, ${reportagem.longitude}</p>
                <p><strong>Risco:</strong> <span class="risk-${riskText.toLowerCase()}">${riskText}</span></p>
                <p><strong>Solução AI:</strong> ${reportagem.solutionAi === 'none' ? 'Nenhuma' : reportagem.solutionAi}</p>
                <p><strong>Status:</strong> ${reportagem.status === 'active' ? 'Ativo' : reportagem.status}</p>
            `;
            reportagensList.appendChild(reportagemItem);
        });
    } catch (error) {
        console.error('Erro ao carregar reportagens:', error);
        reportagensList.innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
}

fetchReportagens();

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