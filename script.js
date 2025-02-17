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
            } else {
                const result = `
                    <strong>IP:</strong> ${data.ip} <br>
                    <strong>Localização:</strong> ${data.city}, ${data.region}, ${data.country_name} <br>
                    <strong>Org:</strong> ${data.org} <br>
                    <strong>Latitude:</strong> ${data.latitude} <br>
                    <strong>Longitude:</strong> ${data.longitude}
                `;
                document.getElementById("lookupResult").innerHTML = result;
            }
        })
        .catch(error => {
            document.getElementById("lookupResult").innerHTML = "Não foi possível consultar o IP.";
        });
});