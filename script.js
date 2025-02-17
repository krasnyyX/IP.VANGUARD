// 1️⃣ BUSCAR MEU IP (IP PÚBLICO - INTERNET)
async function buscarMeuIP() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        document.getElementById("meu-ip").innerHTML = `<p><strong>📌 Meu IP:</strong> ${data.ip}</p>`;
    } catch (error) {
        document.getElementById("meu-ip").innerHTML = `<p style="color: red;">Erro ao buscar IP.</p>`;
    }
}

// 2️⃣ CONSULTA DE UM IP DIGITADO
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
        exibirResultado(data, "resultado");
    } catch (error) {
        document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// 3️⃣ BUSCAR O IP DO DISPOSITIVO (Wi-Fi / Rede Local)
function buscarIPDispositivo() {
    let ipLocal = "Não disponível";

    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel("");
    pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .catch(() => {});

    pc.onicecandidate = event => {
        if (event && event.candidate && event.candidate.candidate) {
            let ipMatch = event.candidate.candidate.match(
                /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/
            );
            if (ipMatch) {
                ipLocal = ipMatch[1];
                document.getElementById("resultado-dispositivo").innerHTML =
                    `<p><strong>📡 IP do Dispositivo:</strong> ${ipLocal}</p>`;
            }
        }
    };
}

// Função para exibir os resultados
function exibirResultado(data, resultadoId) {
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

    document.getElementById(resultadoId).innerHTML = resultado;
}