// Quando o botão "Meu IP" for clicado
document.getElementById('myIPBtn').addEventListener('click', function() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const city = data.city || 'Desconhecida';
            const region = data.region || 'Desconhecida';
            const country = data.country || 'Desconhecido';
            const lat = data.latitude;
            const lon = data.longitude;

            // Exibe as informações do IP
            document.getElementById("myIPResult").innerHTML = `
                <strong>Seu IP:</strong> ${ip} <br>
                <strong>Localização:</strong> ${city}, ${region}, ${country} <br>
                <strong>Latitude:</strong> ${lat} <br>
                <strong>Longitude:</strong> ${lon}
            `;

            // Exibe o mapa do Google sem chave de API
            const mapFrame = `
                <iframe
                    width="100%"
                    height="350"
                    frameborder="0"
                    style="border:0"
                    src="https://www.google.com/maps/embed/v1/view?center=${lat},${lon}&zoom=12" allowfullscreen>
                </iframe>
            `;
            document.getElementById("myIPResult").innerHTML += mapFrame;
        })
        .catch(error => {
            document.getElementById("myIPResult").innerHTML = "Não foi possível consultar o IP.";
        });
});

// Quando o botão "Consultar IP" for clicado
document.getElementById('lookupBtn').addEventListener('click', function() {
    const ip = document.getElementById('ipInput').value;
    
    if (!ip) {
        alert("Por favor, insira um IP para consulta.");
        return;
    }

    fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`)
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const city = data.city || 'Desconhecida';
            const region = data.region || 'Desconhecida';
            const country = data.country || 'Desconhecido';
            const lat = data.latitude;
            const lon = data.longitude;

            // Exibe as informações do IP consultado
            document.getElementById("lookupResult").innerHTML = `
                <strong>IP Consultado:</strong> ${ipAddress} <br>
                <strong>Localização:</strong> ${city}, ${region}, ${country} <br>
                <strong>Latitude:</strong> ${lat} <br>
                <strong>Longitude:</strong> ${lon}
            `;

            // Exibe o mapa do Google para o IP consultado
            const mapFrame = `
                <iframe
                    width="100%"
                    height="350"
                    frameborder="0"
                    style="border:0"
                    src="https://www.google.com/maps/embed/v1/view?center=${lat},${lon}&zoom=12" allowfullscreen>
                </iframe>
            `;
            document.getElementById("lookupResult").innerHTML += mapFrame;
        })
        .catch(error => {
            document.getElementById("lookupResult").innerHTML = "Não foi possível consultar o IP fornecido.";
        });
});