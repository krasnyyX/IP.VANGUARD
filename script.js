async function buscarMeuIP() {
    try {
        let ipv4Response = await fetch("https://api.ipify.org?format=json");
        let ipv6Response = await fetch("https://api64.ipify.org?format=json");

        if (!ipv4Response.ok || !ipv6Response.ok) throw new Error("Erro ao buscar IP.");

        let ipv4 = (await ipv4Response.json()).ip;
        let ipv6 = (await ipv6Response.json()).ip;

        document.getElementById("meuIPResultado").innerHTML = `
            <div class="resultado-box">
                <h3>🔍 Meu IP</h3>
                <p><strong>🌐 IPv4:</strong> ${ipv4 || "Não disponível"}</p>
                <p><strong>🆔 IPv6:</strong> ${ipv6 || "Não disponível"}</p>
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
        
        if (data.bogon || data.ip.startsWith("192.168") || data.ip.startsWith("10.") || data.ip.startsWith("172.16")) {
            throw new Error("Esse IP é de uma rede privada e não pode ser consultado.");
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