document.addEventListener('DOMContentLoaded', () => {
    const myIPBtn = document.getElementById('myIPBtn');
    const lookupBtn = document.getElementById('lookupBtn');
    const ipInput = document.getElementById('ipInput');
    const myIPResult = document.getElementById('myIPResult');
    const lookupResult = document.getElementById('lookupResult');
    const languageSelector = document.getElementById('languageSelector');

    // Função para obter o IP público do usuário
    const getMyIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            myIPResult.textContent = `Seu IP: ${data.ip}`;
        } catch (error) {
            myIPResult.textContent = 'Erro ao obter IP.';
        }
    };

    // Função para consultar o IP
    const lookupIP = async () => {
        const ip = ipInput.value.trim();
        if (!ip) {
            lookupResult.textContent = 'Por favor, digite um IP.';
            return;
        }

        try {
            const response = await fetch(`https://ipinfo.io/${ip}/json`);
            const data = await response.json();
            if (data.error) {
                lookupResult.textContent = 'IP não encontrado ou inválido.';
            } else {
                lookupResult.innerHTML = `
                    <strong>IP:</strong> ${data.ip}<br>
                    <strong>Localização:</strong> ${data.city}, ${data.region}, ${data.country}<br>
                    <strong>Organização:</strong> ${data.org}
                `;
            }
        } catch (error) {
            lookupResult.textContent = 'Erro ao consultar o IP.';
        }
    };

    // Evento para o botão "Meu IP"
    myIPBtn.addEventListener('click', getMyIP);

    // Evento para o botão "Consultar IP"
    lookupBtn.addEventListener('click', lookupIP);

    // Função para trocar idioma
    languageSelector.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;

        if (selectedLanguage === 'en') {
            document.querySelector('h1').textContent = 'IP Lookup';
            myIPBtn.textContent = 'My IP';
            lookupBtn.textContent = 'Lookup';
            ipInput.placeholder = 'Enter an IP';
            lookupResult.textContent = '';
            myIPResult.textContent = '';
        } else if (selectedLanguage === 'ru') {
            document.querySelector('h1').textContent = 'Проверка IP';
            myIPBtn.textContent = 'Мой IP';
            lookupBtn.textContent = 'Проверить';
            ipInput.placeholder = 'Введите IP';
            lookupResult.textContent = '';
            myIPResult.textContent = '';
        } else {
            document.querySelector('h1').textContent = 'Consulta de IP';
            myIPBtn.textContent = 'Meu IP';
            lookupBtn.textContent = 'Consultar';
            ipInput.placeholder = 'Digite um IP';
            lookupResult.textContent = '';
            myIPResult.textContent = '';
        }
    });
});