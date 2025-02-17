document.getElementById('myIPBtn').addEventListener('click', function() {
    // Obtém o IP público do usuário
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            document.getElementById('myIPResult').innerHTML = getLocalizedText('yourIp') + ip;
            fetchLocationInfo(ip);  // Chama a função para obter informações sobre o IP
        })
        .catch(error => {
            console.error('Erro ao obter o IP:', error);
            document.getElementById('myIPResult').innerHTML = getLocalizedText('errorGettingIp');
        });
});

document.getElementById('lookupBtn').addEventListener('click', function() {
    // Obtém o IP inserido pelo usuário
    const ip = document.getElementById('ipInput').value.trim();
    
    if (ip) {
        fetchLocationInfo(ip);  // Chama a função para obter informações sobre o IP inserido
    } else {
        document.getElementById('lookupResult').innerHTML = getLocalizedText('pleaseEnterValidIp');
    }
});

function fetchLocationInfo(ip) {
    // API ipstack para obter informações sobre o IP (requer chave de API)
    const apiKey = 'YOUR_API_KEY';  // Coloque sua chave de API aqui
    fetch(`http://api.ipstack.com/${ip}?access_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('lookupResult').innerHTML = getLocalizedText('ipNotFound');
            } else {
                const { city, region_name, country_name, latitude, longitude } = data;

                // Exibe as informações do IP
                const resultHTML = `
                    <p><strong>${getLocalizedText('location')}:</strong> ${city}, ${region_name}, ${country_name}</p>
                    <p><strong>${getLocalizedText('latitude')}:</strong> ${latitude}</p>
                    <p><strong>${getLocalizedText('longitude')}:</strong> ${longitude}</p>
                `;
                document.getElementById('lookupResult').innerHTML = resultHTML;
            }
        })
        .catch(error => {
            console.error('Erro ao obter a localização do IP:', error);
            document.getElementById('lookupResult').innerHTML = getLocalizedText('errorFetchingIpInfo');
        });
}

// Função para pegar a tradução com base no idioma selecionado
function getLocalizedText(key) {
    const language = document.getElementById('languageSelector').value;
    const translations = {
        pt: {
            yourIp: "Seu IP: ",
            errorGettingIp: "Erro ao obter o IP.",
            pleaseEnterValidIp: "Por favor, insira um IP válido.",
            ipNotFound: "IP não encontrado ou inválido.",
            location: "Localização",
            latitude: "Latitude",
            longitude: "Longitude",
            errorFetchingIpInfo: "Erro ao consultar as informações do IP."
        },
        en: {
            yourIp: "Your IP: ",
            errorGettingIp: "Error getting IP.",
            pleaseEnterValidIp: "Please enter a valid IP.",
            ipNotFound: "IP not found or invalid.",
            location: "Location",
            latitude: "Latitude",
            longitude: "Longitude",
            errorFetchingIpInfo: "Error fetching IP information."
        },
        ru: {
            yourIp: "Ваш IP: ",
            errorGettingIp: "Ошибка при получении IP.",
            pleaseEnterValidIp: "Пожалуйста, введите действительный IP.",
            ipNotFound: "IP не найден или неверен.",
            location: "Местоположение",
            latitude: "Широта",
            longitude: "Долгота",
            errorFetchingIpInfo: "Ошибка при получении информации о IP."
        }
    };

    return translations[language][key] || translations['pt'][key]; // Default to Portuguese if translation is not found
}

// Detecta a mudança de idioma e atualiza o conteúdo da página
document.getElementById('languageSelector').addEventListener('change', function() {
    document.getElementById('title').innerHTML = getLocalizedText('ipQuery');
    document.getElementById('myIPBtn').innerHTML = getLocalizedText('myIpButton');
    document.getElementById('lookupBtn').innerHTML = getLocalizedText('lookupButton');
});