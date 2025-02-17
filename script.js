document.addEventListener("DOMContentLoaded", function () {
    const inputIP = document.getElementById("ip-input");
    const btnBuscar = document.getElementById("btn-buscar");
    const resultBox = document.getElementById("resultado");

    // Consulta IP inserido ou IP do usuário
    btnBuscar.addEventListener("click", async function () {
        let ip = inputIP.value.trim();
        if (!ip) {
            ip = await obterIPPublico(); // Se vazio, pega o IP público do usuário
        }
        consultarIP(ip);
    });

    // Obtém o IP público automaticamente ao carregar a página
    async function obterIPPublico() {
        try {
            const response = await fetch("https://api64.ipify.org?format=json");
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Erro ao obter IP público:", error);
            return "Erro ao obter IP";
        }
    }

    // Obtém o IP do Wi-Fi
    async function obterIPWiFi() {
        try {
            const response = await fetch("https://ipwho.is/");
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Erro ao obter IP do Wi-Fi:", error);
            return "Erro ao obter IP do Wi-Fi";
        }
    }

    // Consulta as informações do IP
    async function consultarIP(ip) {
        try {
            const response = await fetch(`https://ipwho.is/${ip}`);
            const data = await response.json();

            if (!data.success) {
                resultBox.innerHTML = "IP inválido ou não encontrado.";
                return;
            }

            // Exibir informações detalhadas
            resultBox.innerHTML = `
                <b>IP:</b> ${data.ip} <br>
                <b>País:</b> ${data.country} (${data.country_code}) <br>
                <b>Região:</b> ${data.region} <br>
                <b>Cidade:</b> ${data.city} <br>
                <b>Provedor (ISP):</b> ${data.connection.isp} <br>
                <b>Organização:</b> ${data.connection.org} <br>
                <b>VPN/Proxy:</b> ${data.security.vpn ? "Sim" : "Não"} <br>
                <b>IP do Wi-Fi:</b> ${await obterIPWiFi()} <br>
            `;
        } catch (error) {
            resultBox.innerHTML = "Erro ao consultar o IP.";
            console.error("Erro na consulta de IP:", error);
        }
    }
});