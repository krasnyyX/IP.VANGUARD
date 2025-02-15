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