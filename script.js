async function meuIP() {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        
        const responseInfo = await fetch(`https://ipinfo.io/${data.ip}/json`);
        const info = await responseInfo.json();
        
        exibirResultado(info, "meuIpResultado");
    } catch (error) {
        document.getElementById("meuIpResultado").innerHTML = `<p style="color: red;">Erro ao obter IP.</p>`;
    }
}

async function buscarIP() {
    let ip = document.getElementById("ipInput").value.trim();
    if (!ip) {
        document.getElementById("resultado").innerHTML = `<p style="color: red;">Digite um IP válido!</p>`;
        return;
    }

    try {
        const response = await fetch(`https://ipinfo.io/${ip}/json`);
        const data = await response.json();
        
        if (data.bogon) {
            throw new Error("IP inválido ou reservado.");
        }

        exibirResultado(data, "resultado");
    } catch (error) {
        document.getElementById("resultado").innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

async function consultaDispositivo() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();

        const responseInfo = await fetch(`https://ipinfo.io/${data.ip}/json`);
        const info = await responseInfo.json();

        exibirResultado(info, "dispositivoResultado");
    } catch (error) {
        document.getElementById("dispositivoResultado").innerHTML = `<p style="color: red;">Erro ao obter IP do dispositivo.</p>`;
    }
}

function exibirResultado(data, elementoID) {
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

    document.getElementById(elementoID).innerHTML = resultado;
}