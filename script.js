async function buscarMeuIP() {
    try {
        let response = await fetch("https://api64.ipify.org?format=json");
        if (!response.ok) throw new Error("Erro ao buscar IPv4");

        let data = await response.json();
        let ipv4 = data.ip;

        response = await fetch("https://api64.ipify.org?format=json");
        let ipv6 = response.ok ? (await response.json()).ip : "Não disponível";

        document.getElementById("meuIPResultado").innerHTML = `
            <div class="resultado-box">
                <h3>🔍 Meu IP</h3>
                <p><strong>🌐 IPv4:</strong> ${ipv4}</p>
                <p><strong>🆔 IPv6:</strong> ${ipv6}</p>
            </div>
        `;
    } catch (error) {
        document.getElementById("meuIPResultado").innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

async function buscarIP() {
    let ip = document.getElementById('ipInput').value.trim();
    let url = ip ? `https://ipinfo.io/${ip}/json` : `https://ipinfo.io/json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar informações.");

        const data = await response.json();
        if (data.bogon) throw new Error("IP inválido ou reservado.");

        exibirResultado(data);
    } catch (error) {
        document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function exibirResultado(data) {
    let [lat, lon] = data.loc ? data.loc.split(",") : ["Não disponível", "Não disponível"];
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

    const resultado = `
        <div class="resultado-box">
            <h3>🔍 Informações do IP</h3>
            <p><strong>📌 IP:</strong> ${data.ip}</p>
            <p><strong>🌍 País:</strong> ${data.country || "Não disponível"}</p>
            <p><strong>🏙️ Estado:</strong> ${data.region || "Não disponível"}</p>
            <p><strong>🏡 Cidade:</strong> ${data.city || "Não disponível"}</p>
            <p><strong>🛰️ Provedor:</strong> ${data.org || "Não disponível"}</p>
            <p><strong>📍 Localização:</strong> ${lat}, ${lon}</p>
            <p><a href="${googleMapsUrl}" target="_blank">🗺️ Ver no Google Maps</a></p>
        </div>
    `;

    document.getElementById('resultado').innerHTML = resultado;
}

async function buscarIPDispositivo() {
    try {
        let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        let connectionType = connection ? connection.effectiveType.toUpperCase() : "Desconhecido";
        let speed = connection ? connection.downlink + " Mbps" : "Desconhecida";

        document.getElementById("dispositivoResultado").innerHTML = `
            <div class="resultado-box">
                <h3>📲 IP do Dispositivo</h3>
                <p><strong>🔌 Tipo de conexão:</strong> ${connectionType}</p>
                <p><strong>⚡ Velocidade:</strong> ${speed}</p>
            </div>
        `;
    } catch (error) {
        document.getElementById("dispositivoResultado").innerHTML = `<p style="color: red;">Erro ao buscar informações.</p>`;
    }
}