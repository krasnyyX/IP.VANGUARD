// Consulta de um IP digitado pelo usuário
async function buscarIP() {
    let ip = document.getElementById('ipInput').value.trim();
    if (!ip) {
        document.getElementById('resultado').innerHTML = `<p style="color: red;">Digite um IP para consultar.</p>`;
        return;
    }

    let url = `https://ipinfo.io/${ip}/json`;

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

// Consulta do IP da internet do usuário
async function buscarIPInternet() {
    try {
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        let url = `https://ipinfo.io/${ip}/json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro ao buscar informações.");
        }

        const data = await response.json();
        exibirResultado(data, true);
    } catch (error) {
        document.getElementById('resultado-internet').innerHTML = `<p style="color: red;">Erro ao buscar o IP da internet.</p>`;
    }
}

// Exibe os resultados formatados
function exibirResultado(data, isInternet = false) {
    let [lat, lon] = data.loc ? data.loc.split(",") : ["Não disponível", "Não disponível"];
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

    const resultado = `
        <div class="resultado-box">
            <h3>🔍 ${isInternet ? "Seu IP da Internet" : "Informações do IP"}</h3>
            <p><strong>📌 IP:</strong> ${data.ip}</p>
            <p><strong>🌍 País:</strong> ${data.country || "Não disponível"}</p>
            <p><strong>🏙️ Estado:</strong> ${data.region || "Não disponível"}</p>
            <p><strong>🏡 Cidade:</strong> ${data.city || "Não disponível"}</p>
            <p><strong>🛰️ Provedor:</strong> ${data.org || "Não disponível"}</p>
            <p><strong>📍 Localização:</strong> ${lat}, ${lon}</p>
            <p><a href="${googleMapsUrl}" target="_blank">🗺️ Ver no Google Maps</a></p>
        </div>
    `;

    if (isInternet) {
        document.getElementById('resultado-internet').innerHTML = resultado;
    } else {
        document.getElementById('resultado').innerHTML = resultado;
    }
}