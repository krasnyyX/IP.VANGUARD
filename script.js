document.addEventListener("DOMContentLoaded", function () {
    const inputIP = document.getElementById("inputIP");
    const btnBuscar = document.getElementById("btnBuscar");
    const resultado = document.getElementById("resultado");
    const btnMeuIP = document.getElementById("btnMeuIP");

    // Função para buscar informações do IP digitado
    async function buscarIP(ip) {
        try {
            const response = await fetch(`https://ip-api.com/json/${ip}`);
            const data = await response.json();

            if (data.status === "fail") {
                resultado.innerHTML = "<p>IP inválido ou reservado.</p>";
                return;
            }

            resultado.innerHTML = `
                <p><strong>IP:</strong> ${data.query}</p>
                <p><strong>País:</strong> ${data.country}</p>
                <p><strong>Região:</strong> ${data.regionName}</p>
                <p><strong>Cidade:</strong> ${data.city}</p>
                <p><strong>Provedor:</strong> ${data.isp}</p>
                <p><strong>Lat/Lon:</strong> ${data.lat}, ${data.lon}</p>
            `;
        } catch (error) {
            resultado.innerHTML = "<p>Erro ao buscar o IP.</p>";
        }
    }

    // Evento para buscar IP digitado
    btnBuscar.addEventListener("click", function () {
        const ip = inputIP.value.trim();
        if (ip) {
            buscarIP(ip);
        } else {
            resultado.innerHTML = "<p>Digite um IP para consulta.</p>";
        }
    });

    // Função para obter o IP público do usuário
    async function buscarMeuIP() {
        try {
            const response = await fetch("https://api64.ipify.org?format=json");
            const data = await response.json();
            buscarIP(data.ip);
        } catch (error) {
            resultado.innerHTML = "<p>Erro ao obter seu IP.</p>";
        }
    }

    // Evento para buscar o próprio IP
    btnMeuIP.addEventListener("click", buscarMeuIP);
});