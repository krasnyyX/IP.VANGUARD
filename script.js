// Função para obter o IP público (IP da internet)
async function verMeuIP() {
    try {
        let response = await fetch("https://api64.ipify.org?format=json");
        let data = await response.json();
        document.getElementById("meu-ip").innerText = `Meu IP (IPv4): ${data.ip}`;
    } catch (error) {
        document.getElementById("meu-ip").innerText = "Erro ao obter IP.";
    }
}

// Função para consultar um IP específico
async function consultarIP() {
    let ip = document.getElementById("input-ip").value.trim();
    
    if (ip === "") {
        verMeuIP(); // Se o campo estiver vazio, retorna o próprio IP
        return;
    }

    try {
        let response = await fetch(`https://ip-api.com/json/${ip}`);
        let data = await response.json();

        if (data.status === "fail") {
            document.getElementById("resultado-ip").innerText = "IP inválido ou reservado.";
        } else {
            document.getElementById("resultado-ip").innerText = `
                IP: ${data.query}
                País: ${data.country}
                Cidade: ${data.city}
                Provedor: ${data.isp}
            `;
        }
    } catch (error) {
        document.getElementById("resultado-ip").innerText = "Erro ao consultar IP.";
    }
}

// Função para obter o IP local do dispositivo
async function verIPDispositivo() {
    try {
        let rtc = new RTCPeerConnection({ iceServers: [] });
        rtc.createDataChannel("");
        rtc.createOffer().then(offer => rtc.setLocalDescription(offer));

        rtc.onicecandidate = event => {
            if (event && event.candidate && event.candidate.candidate) {
                let ipMatch = event.candidate.candidate.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
                if (ipMatch) {
                    document.getElementById("ip-dispositivo").innerText = `IP do Dispositivo: ${ipMatch[0]}`;
                }
                rtc.close();
            }
        };
    } catch (error) {
        document.getElementById("ip-dispositivo").innerText = "Não foi possível obter o IP do dispositivo.";
    }
}