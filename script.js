async function buscarMeuIP() {
    try {
        const responseIPv4 = await fetch("https://api4.my-ip.io/ip.json");
        const responseIPv6 = await fetch("https://api64.ipify.org?format=json");

        if (!responseIPv4.ok || !responseIPv6.ok) {
            throw new Error("Erro ao buscar informações do IP.");
        }

        const dataIPv4 = await responseIPv4.json();
        const dataIPv6 = await responseIPv6.json();

        let resultado = `
            <div class="resultado-box">
                <h3>🔍 Meu IP</h3>
                <p><strong>🌐 IPv4:</strong> ${dataIPv4.ip}</p>
                <p><strong>🔗 IPv6:</strong> ${dataIPv6.ip || "Não disponível"}</p>
            </div>
        `;

        document.getElementById('meuIPResultado').innerHTML = resultado;
    } catch (error) {
        document.getElementById('meuIPResultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

async function buscarIP() {
    let ip = document.getElementById('ipInput').value.trim();
    let url = ip ? `https://ipinfo.io/${ip}/json` : `https://ipinfo.io/json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro ao buscar informações.");
        }

        const data = await response.json();
        if (data.bogon) {
            throw new Error("IP inválido ou reservado.");
        }

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

// Consulta o IP do dispositivo (local)
async function buscarIPDispositivo() {
    try {
        const connection = await navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        let tipo = connection ? connection.type : "Não disponível";
        let velocidade = connection ? connection.downlink + " Mbps" : "Não disponível";

        let resultado = `
            <div class="resultado-box">
                <h3>📱 IP do Dispositivo</h3>
                <p><strong>📶 Tipo de Conexão:</strong> ${tipo}</p>
                <p><strong>⚡ Velocidade Estimada:</strong> ${velocidade}</p>
            </div>
        `;

        document.getElementById('dispositivoResultado').innerHTML = resultado;
    } catch (error) {
        document.getElementById('dispositivoResultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}