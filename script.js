// Função para buscar o IP da Internet e o IP do Dispositivo
async function buscarMeuIP() {
    try {
        // Obtendo o IP da Internet (IP Público)
        let internetIPResponse = await fetch('https://api64.ipify.org?format=json');
        let internetIPData = await internetIPResponse.json();
        
        // Obtendo o IP do Dispositivo (IP Local)
        let localIP = await obterIPLocal();

        // Exibindo os resultados
        document.getElementById('resultado-meu-ip').innerHTML = `
            <div class="resultado-box">
                <h3>🔍 Meu IP</h3>
                <p><strong>🌐 IP da Internet:</strong> ${internetIPData.ip}</p>
                <p><strong>📡 IP do Dispositivo:</strong> ${localIP}</p>
            </div>
        `;
    } catch (error) {
        document.getElementById('resultado-meu-ip').innerHTML = `<p style="color: red;">Erro ao buscar o IP.</p>`;
    }
}

// Função para buscar informações de um IP digitado
async function buscarIP() {
    let ip = document.getElementById('ipInput').value.trim();
    if (!ip) {
        document.getElementById('resultado-consulta-ip').innerHTML = `<p style="color: red;">Digite um IP para buscar.</p>`;
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

        exibirResultado(data, 'resultado-consulta-ip');
    } catch (error) {
        document.getElementById('resultado-consulta-ip').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// Função para obter o IP local (do dispositivo)
async function obterIPLocal() {
    return new Promise((resolve) => {
        let pc = new RTCPeerConnection();
        pc.createDataChannel("");
        pc.createOffer().then((offer) => pc.setLocalDescription(offer));

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                let ipMatch = event.candidate.candidate.match(/\d+\.\d+\.\d+\.\d+/);
                if (ipMatch) {
                    resolve(ipMatch[0]);
                }
            }
        };
    });
}

// Função para exibir os resultados formatados
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