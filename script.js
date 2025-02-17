// Elementos do HTML
const meuIpBtn = document.getElementById("meuIpBtn");
const ipWifiBtn = document.getElementById("ipWifiBtn");
const consultaBtn = document.getElementById("consultaBtn");
const inputIp = document.getElementById("inputIp");
const resultadoDiv = document.getElementById("resultado");

// Função para buscar o IP público (internet)
async function pegarMeuIP() {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        const meuIp = data.ip;
        buscarInformacoesIP(meuIp);
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao buscar seu IP.";
    }
}

// Função para pegar o IP da rede local (Wi-Fi)
async function pegarIpWiFi() {
    try {
        const response = await fetch("https://api.my-ip.io/ip.json");
        const data = await response.json();
        const ipWiFi = data.ip;
        buscarInformacoesIP(ipWiFi);
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao buscar o IP do Wi-Fi.";
    }
}

// Função para buscar informações de um IP específico
async function buscarInformacoesIP(ip) {
    try {
        const response = await fetch(`https://ipwho.is/${ip}`);
        const data = await response.json();

        if (!data.success) {
            resultadoDiv.innerHTML = "IP inválido ou erro na consulta.";
            return;
        }

        resultadoDiv.innerHTML = `
            <strong>IP:</strong> ${data.ip} <br>
            <strong>Tipo:</strong> ${data.type} <br>
            <strong>País:</strong> ${data.country} (${data.country_code}) <br>
            <strong>Região:</strong> ${data.region} <br>
            <strong>Cidade:</strong> ${data.city} <br>
            <strong>Provedor:</strong> ${data.org} <br>
            <strong>Latitude:</strong> ${data.latitude} <br>
            <strong>Longitude:</strong> ${data.longitude} <br>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao buscar informações do IP.";
    }
}

// Evento para pegar o IP público
meuIpBtn.addEventListener("click", pegarMeuIP);

// Evento para pegar o IP da rede Wi-Fi
ipWifiBtn.addEventListener("click", pegarIpWiFi);

// Evento para consultar um IP digitado
consultaBtn.addEventListener("click", () => {
    const ip = inputIp.value.trim();
    if (ip) {
        buscarInformacoesIP(ip);
    } else {
        resultadoDiv.innerHTML = "Digite um IP válido.";
    }
});