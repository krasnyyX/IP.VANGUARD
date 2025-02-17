document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getMyIP").addEventListener("click", fetchMyIP);
    document.getElementById("lookupIP").addEventListener("click", fetchLookupIP);
});

function fetchMyIP() {
    fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("myIPResult").textContent = "Seu IP: " + data.ip;
        })
        .catch(error => {
            document.getElementById("myIPResult").textContent = "Erro ao buscar o IP.";
        });
}

function fetchLookupIP() {
    let ip = document.getElementById("ipInput").value.trim();
    if (ip === "") {
        document.getElementById("lookupResult").textContent = "Digite um IP válido.";
        return;
    }

    fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("lookupResult").textContent = "IP inválido ou reservado.";
            } else {
                document.getElementById("lookupResult").innerHTML = `
                    <strong>IP:</strong> ${data.ip} <br>
                    <strong>Cidade:</strong> ${data.city} <br>
                    <strong>Região:</strong> ${data.region} <br>
                    <strong>País:</strong> ${data.country_name} <br>
                    <strong>ISP:</strong> ${data.org} <br>
                    <strong>Latitude:</strong> ${data.latitude} <br>
                    <strong>Longitude:</strong> ${data.longitude}
                `;
            }
        })
        .catch(error => {
            document.getElementById("lookupResult").textContent = "Erro ao buscar informações do IP.";
        });
}