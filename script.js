// Função para obter o IP público do usuário
async function obterMeuIP() {
    let resultadoDiv = document.getElementById("resultadoMeuIP");

    try {
        let response = await fetch("https://api64.ipify.org?format=json");
        let data = await response.json();

        resultadoDiv.innerHTML = `
            <strong>Seu IP Público:</strong> ${data.ip} <br>
            <strong>Tipo:</strong> ${data.ip.includes(":") ? "IPv6" : "IPv4"}
        `;
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao obter seu IP.";
    }
}

// Função para consultar informações de um IP digitado
async function consultarIP() {
    let ip = document.getElementById("ipInput").value.trim();
    let resultadoDiv = document.getElementById("resultadoIP");

    if (ip === "") {
        resultadoDiv.innerHTML = "Digite um IP válido.";
        return;
    }

    try {
        let response = await fetch(`https://ipapi.co/${ip}/json/`);
        let data = await response.json();

        if (data.error) {
            resultadoDiv.innerHTML = "IP inválido ou reservado.";
            return;
        }

        resultadoDiv.innerHTML = `
            <strong>IP:</strong> ${data.ip} <br>
            <strong>Provedor:</strong> ${data.org || "Não disponível"} <br>
            <strong>Localização:</strong> ${data.city}, ${data.region}, ${data.country_name} <br>
            <strong>Tipo:</strong> ${data.version} (${data.version === "4" ? "IPv4" : "IPv6"})
        `;
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao consultar o IP.";
    }
}

// Função para obter o IP local do dispositivo
async function obterIPDispositivo() {
    let resultadoDiv = document.getElementById("resultadoIPDispositivo");

    try {
        let peerConnection = new RTCPeerConnection({ iceServers: [] });

        peerConnection.createDataChannel("");
        let offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                let ip = event.candidate.candidate.split(" ")[4];
                resultadoDiv.innerHTML = `<strong>IP do Dispositivo:</strong> ${ip}`;
                peerConnection.close();
            }
        };
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao obter IP do dispositivo.";
    }
}

// Função para consultar CPF (simulação)
async function consultarCPF() {
    let cpf = document.getElementById("cpfInput").value.trim();
    let resultadoDiv = document.getElementById("resultadoCPF");

    if (cpf === "") {
        resultadoDiv.innerHTML = "Digite um CPF válido.";
        return;
    }

    try {
        // Simulação de API para consulta de CPF (trocar por uma API real)
        let response = await fetch(`https://api.exemplo.com/cpf/${cpf}`);
        let data = await response.json();

        if (data.error) {
            resultadoDiv.innerHTML = "CPF inválido ou não encontrado.";
            return;
        }

        resultadoDiv.innerHTML = `
            <strong>Nome:</strong> ${data.nome} <br>
            <strong>Data de Nascimento:</strong> ${data.nascimento} <br>
            <strong>Situação:</strong> ${data.situacao}
        `;
    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao consultar o CPF.";
    }
}

// Event Listeners
document.getElementById("btnMeuIP").addEventListener("click", obterMeuIP);
document.getElementById("btnConsultarIP").addEventListener("click", consultarIP);
document.getElementById("btnIPDispositivo").addEventListener("click", obterIPDispositivo);
document.getElementById("btnConsultarCPF").addEventListener("click", consultarCPF);