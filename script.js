// Consulta de IP digitado ou, se vazio, busca automaticamente o IP da internet e o IP local
async function buscarIP() {
    let ip = document.getElementById('ipInput').value.trim();
    let ipPublico = "";
    let ipLocal = "Não disponível";

    // Se não for digitado um IP, buscar o IP da internet e o IP local
    if (!ip) {
        try {
            // Obtendo o IP da internet (público)
            const ipResponse = await fetch("https://api64.ipify.org?format=json");
            const ipData = await ipResponse.json();
            ipPublico = ipData.ip;
            ip = ipPublico;
        } catch (error) {
            document.getElementById('resultado').innerHTML = `<p style="color: red;">Erro ao obter o IP da internet.</p>`;
            return;
        }

        try {
            // Obtendo o IP local do dispositivo
            const rtc = new RTCPeerConnection({ iceServers: [] });
            rtc.createDataChannel("");
            rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
            rtc.onicecandidate = event => {
                if (event && event.candidate) {
                    const ipRegex = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/;
                    const match = ipRegex.exec(event.candidate.candidate);
                    if (match) {
                        ipLocal = match[1];
                        exibirResultado(ipPublico, ipLocal);
                    }
                }
            };
        } catch (error) {
            console.error("Erro ao obter IP local:", error);
        }
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

        exibirResultado(data, ipPublico, ipLocal);
    } catch (error) {
        document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// Exibe os resultados formatados na página
function exibirResultado(data, ipPublico, ipLocal) {
    let [lat, lon] = data.loc ? data.loc.split(",") : ["Não disponível", "Não disponível"];
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

    const resultado = `
        <div class="resultado-box">
            <h3>🔍 Informações do IP</h3>
            <p><strong>📌 IP Público (Internet):</strong> ${ipPublico}</p>
            <p><strong>💻 IP Local (Dispositivo):</strong> ${ipLocal}</p>
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