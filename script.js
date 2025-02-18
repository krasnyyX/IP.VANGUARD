// Função para obter o IP público do usuário
document.getElementById("myIPBtn").addEventListener("click", function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("myIPResult").innerHTML = `Seu IP: ${data.ip}`;
        })
        .catch(error => {
            document.getElementById("myIPResult").innerHTML = "Não foi possível obter o IP.";
        });
});

// Função para consultar um IP específico
document.getElementById("lookupBtn").addEventListener("click", function() {
    const ip = document.getElementById("ipInput").value.trim();
    
    if (!ip) {
        document.getElementById("lookupResult").innerHTML = "Por favor, digite um IP para consultar.";
        return;
    }

    fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("lookupResult").innerHTML = "IP não encontrado ou inválido.";
                return;
            }

            // Exibindo as informações do IP
            const result = `
                <strong>IP:</strong> ${data.ip} <br>
                <strong>Localização:</strong> ${data.city || 'Desconhecido'}, ${data.region || 'Desconhecido'}, ${data.country_name || 'Desconhecido'} <br>
                <strong>Organização:</strong> ${data.org || 'Desconhecido'} <br>
                <strong>ISP:</strong> ${data.isp || 'Desconhecido'} <br>
                <strong>CEP:</strong> ${data.zip || 'Desconhecido'} <br>
                <strong>Latitude:</strong> ${data.latitude} <br>
                <strong>Longitude:</strong> ${data.longitude}
            `;
            document.getElementById("lookupResult").innerHTML = result;

            // Adicionando o Google Maps
            const mapFrame = `
                <iframe
                    width="100%"
                    height="350"
                    frameborder="0"
                    style="border:0"
                    src="https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${data.latitude},${data.longitude}&zoom=12" allowfullscreen>
                </iframe>
            `;
            document.getElementById("lookupResult").innerHTML += mapFrame;
        })
        .catch(error => {
            document.getElementById("lookupResult").innerHTML = "Não foi possível consultar o IP.";
        });
});