document.getElementById('myIPBtn').addEventListener('click', function() {
    // Obtém o IP público do usuário
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            document.getElementById('myIPResult').innerHTML = `Seu IP: ${ip}`;
            fetchLocationInfo(ip);  // Chama a função para obter informações sobre o IP
        })
        .catch(error => {
            console.error('Erro ao obter o IP:', error);
            document.getElementById('myIPResult').innerHTML = "Erro ao obter o IP.";
        });
});

document.getElementById('lookupBtn').addEventListener('click', function() {
    // Obtém o IP inserido pelo usuário
    const ip = document.getElementById('ipInput').value;
    fetchLocationInfo(ip);  // Chama a função para obter informações sobre o IP inserido
});

function fetchLocationInfo(ip) {
    // Faz uma requisição para obter informações sobre o IP usando a API ip-api.com (sem necessidade de token)
    fetch(`http://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(data => {
            const { city, region, country, lat, lon } = data;

            // Exibe as informações do IP
            const resultHTML = `
                <p><strong>Localização:</strong> ${city}, ${region}, ${country}</p>
                <p><strong>Latitude:</strong> ${lat}</p>
                <p><strong>Longitude:</strong> ${lon}</p>
            `;
            document.getElementById('lookupResult').innerHTML = resultHTML;

            // Chama a função para exibir o mapa do local
            showMap(lat, lon);
        })
        .catch(error => {
            console.error('Erro ao obter a localização do IP:', error);
            document.getElementById('lookupResult').innerHTML = "Erro ao consultar o IP.";
        });
}

function showMap(lat, lon) {
    // Gera o URL para o mapa estático do Google Maps
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=12&size=600x300&markers=${lat},${lon}&key=YOUR_GOOGLE_MAPS_API_KEY`;
    document.getElementById('mapImage').src = mapUrl;
}