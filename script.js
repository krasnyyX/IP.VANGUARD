async function buscarIP() {
    let ip = document.getElementById('ipInput').value.trim();
    let url = ip ? `https://ipinfo.io/${ip}/json` : `https://ipinfo.io/json`;
    let url2 = ip ? `http://ip-api.com/json/${ip}?fields=status,message,continent,country,regionName,city,isp,org,as,mobile,proxy,lat,lon` : `http://ip-api.com/json/?fields=status,message,continent,country,regionName,city,isp,org,as,mobile,proxy,lat,lon`;

    try {
        const response = await fetch(url);
        const response2 = await fetch(url2);
        if (!response.ok || !response2.ok) {
            throw new Error("Erro ao buscar informações.");
        }

        const data = await response.json();
        const data2 = await response2.json();

        if (data.bogon || data2.status === "fail") {
            throw new Error("IP inválido ou reservado.");
        }

        exibirResultado(data, data2);
    } catch (error) {
        document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function exibirResultado(data, data2) {
    let [lat, lon] = data.loc ? data.loc.split(",") : ["Não disponível", "Não disponível"];
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

    const resultado = `
        <div class="resultado-box">
            <h3>🔍 Informações do IP</h3>
            <p><strong>📌 IP:</strong> ${data.ip}</p>
            <p><strong>🌍 Continente:</strong> ${data2.continent || "Não disponível"}</p>
            <p><strong>🌍 País:</strong> ${data.country || data2.country || "Não disponível"}</p>
            <p><strong>🏙️ Estado:</strong> ${data.region || data2.regionName || "Não disponível"}</p>
            <p><strong>🏡 Cidade:</strong> ${data.city || data2.city || "Não disponível"}</p>
            <p><strong>🛰️ Provedor:</strong> ${data.org || data2.org || "Não disponível"}</p>
            <p><strong>⚡ ASN:</strong> ${data2.as || "Não disponível"}</p>
            <p><strong>📶 Conexão Móvel:</strong> ${data2.mobile ? "Sim" : "Não"}</p>
            <p><strong>🛡️ VPN/Proxy:</strong> ${data2.proxy ? "Sim" : "Não"}</p>
            <p><strong>📍 Localização:</strong> ${lat}, ${lon}</p>
            <p><a href="${googleMapsUrl}" target="_blank">🗺️ Ver no Google Maps</a></p>
        </div>
    `;

    document.getElementById('resultado').innerHTML = resultado;
}