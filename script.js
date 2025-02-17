document.getElementById('myIPBtn').addEventListener('click', function() {
    // Obtém o IP público do usuário
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            document.getElementById('myIPResult').innerHTML = "Seu IP: " + ip;
            fetchLocationInfo(ip);  // Chama a função para obter informações sobre o IP
        })
        .catch(error => {
            console.error('Erro ao obter o IP:', error);
            document.getElementById('myIPResult').innerHTML = "Erro ao obter o IP.";
        });
});

document.getElementById('lookupBtn').addEventListener('click', function() {
    // Obtém o IP inserido pelo usuário
    const ip = document.getElementById('ipInput').value.trim();
    
    if (ip) {
        fetchLocationInfo(ip);  // Chama a função para obter informações sobre o IP inserido
    } else {
        document.getElementById('lookupResult').innerHTML = "Por favor, insira um IP válido.";
    }
});

function fetchLocationInfo(ip) {
    // API ip-api para obter informações sobre o IP (sem chave de API)
    fetch(`http://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('lookupResult').innerHTML = "IP não encontrado ou inválido.";
            } else {
                const { city, regionName, country, lat, lon } = data;

                // Exibe as informações do IP
                const resultHTML = `
                    <p><strong>Localização:</strong> ${city}, ${regionName}, ${country}</p>
                    <p><strong>Latitude:</strong> ${lat}</p>
                    <p><strong>Longitude:</strong> ${lon}</p>
                `;
                document.getElementById('lookupResult').innerHTML = resultHTML;
            }
        })
        .catch(error => {
            console.error('Erro ao obter a localização do IP:', error);
            document.getElementById('lookupResult').innerHTML = "Erro ao consultar as informações do IP.";
        });
}