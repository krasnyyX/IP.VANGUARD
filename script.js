// Função para obter o IP público do usuário
document.getElementById('myIPBtn').addEventListener('click', function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('myIPResult').innerHTML = `<strong>Seu IP:</strong> ${data.ip}`;
        })
        .catch(error => {
            document.getElementById('myIPResult').innerHTML = 'Não foi possível obter o IP.';
        });
});

// Função para consultar um IP
document.getElementById('lookupBtn').addEventListener('click', function() {
    const ip = document.getElementById('ipInput').value.trim();

    if (!ip) {
        document.getElementById('lookupResult').innerHTML = '<strong>Erro:</strong> Por favor, insira um IP.';
        return;
    }

    fetch(`https://ipinfo.io/${ip}/json`)
        .then(response => response.json())
        .then(data => {
            let result = `<strong>IP:</strong> ${data.ip}<br>
                          <strong>Localização:</strong> ${data.city}, ${data.region}, ${data.country}<br>
                          <strong>Hostname:</strong> ${data.hostname}<br>
                          <strong>Organização:</strong> ${data.org}<br>`;

            if (data.loc) {
                const [lat, lon] = data.loc.split(',');
                result += `<strong>Latitude:</strong> ${lat}<br>
                           <strong>Longitude:</strong> ${lon}<br>`;
            }

            document.getElementById('lookupResult').innerHTML = result;
        })
        .catch(error => {
            document.getElementById('lookupResult').innerHTML = '<strong>Erro:</strong> Não foi possível obter as informações do IP.';
        });
});