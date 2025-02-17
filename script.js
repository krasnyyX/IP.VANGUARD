async function obterMeuIP() {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('meu-ip').textContent = `IPv4: ${data.ip}`;
    } catch (error) {
        document.getElementById('meu-ip').textContent = "Erro ao obter IP.";
    }
}

async function obterIPWiFi() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('wifi-ip').textContent = `IP do Wi-Fi: ${data.ip}`;
    } catch (error) {
        document.getElementById('wifi-ip').textContent = "Erro ao obter IP do Wi-Fi.";
    }
}

async function consultarIP() {
    const ip = document.getElementById('ip-input').value.trim();
    if (!ip) {
        document.getElementById('resultado').textContent = "Digite um IP válido.";
        return;
    }

    try {
        const response = await fetch(`https://ipinfo.io/${ip}/json`);
        if (!response.ok) throw new Error("Erro ao consultar IP.");

        const data = await response.json();
        document.getElementById('resultado').innerHTML = `
            <p><strong>IP:</strong> ${data.ip}</p>
            <p><strong>País:</strong> ${data.country || "Não disponível"}</p>
            <p><strong>Região:</strong> ${data.region || "Não disponível"}</p>
            <p><strong>Cidade:</strong> ${data.city || "Não disponível"}</p>
            <p><strong>Provedor:</strong> ${data.org || "Não disponível"}</p>
        `;
    } catch (error) {
        document.getElementById('resultado').textContent = "Erro ao buscar informações.";
    }
}

window.onload = function () {
    obterMeuIP();
    obterIPWiFi();
};