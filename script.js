async function buscarIP() {
    let ip = document.getElementById('ipInput').value.trim();
    let url = ip ? `https://ipwho.is/${ip}` : `https://ipwho.is/`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar informações.");

        const data = await response.json();
        if (!data.success) throw new Error("IP inválido ou não encontrado.");

        exibirResultado(data);
    } catch (error) {
        document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function exibirResultado(data) {
    const googleMapsUrl = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;

    const resultado = `
        <div class="resultado-box">
            <h3>🔍 Informações do IP</h3>
            <p><strong>📌 IP:</strong> ${data.ip}</p>
            <p><strong>🌎 Continente:</strong> ${data.continent || "Não disponível"}</p>
            <p><strong>🌍 País:</strong> ${data.country || "Não disponível"}</p>
            <p><strong>🏙️ Estado:</strong> ${data.region || "Não disponível"}</p>
            <p><strong>🏡 Cidade:</strong> ${data.city || "Não disponível"}</p>
            <p><strong>🛰️ ISP:</strong> ${data.connection.isp || "Não disponível"}</p>
            <p><strong>🛡️ VPN/Proxy:</strong> ${data.security.vpn ? "Sim" : "Não"}</p>
            <p><strong>📍 Localização:</strong> ${data.latitude}, ${data.longitude}</p>
            <p><a href="${googleMapsUrl}" target="_blank">🗺️ Ver no Google Maps</a></p>
        </div>
    `;

    document.getElementById('resultado').innerHTML = resultado;
}