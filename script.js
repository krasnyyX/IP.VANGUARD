async function buscarMeuIP() {
    try {
        // API para pegar o IP da internet (Forçando IPv4)
        const responseInternet = await fetch("https://api4.ipify.org?format=json");
        const dataInternet = await responseInternet.json();
        const meuIPInternet = dataInternet.ip;

        // API para pegar o IP do dispositivo (rede local)
        const responseDispositivo = await fetch("https://api.ipify.org?format=json");
        const dataDispositivo = await responseDispositivo.json();
        const meuIPDispositivo = dataDispositivo.ip;

        document.getElementById('resultado-meu-ip').innerHTML = `
            <div class="resultado-box">
                <h3>📡 Meu IP</h3>
                <p><strong>🌎 IP da Internet (IPv4):</strong> ${meuIPInternet}</p>
                <p><strong>📶 IP do Dispositivo (Local):</strong> ${meuIPDispositivo}</p>
            </div>
        `;
    } catch (error) {
        document.getElementById('resultado-meu-ip').innerHTML = `<p style="color: red;">Erro ao buscar IP.</p>`;
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