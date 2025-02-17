async function getMyIP() {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        document.getElementById("myIpResult").innerHTML = `Meu IP: ${data.ip} (IPv4/IPv6)`;
    } catch (error) {
        document.getElementById("myIpResult").innerHTML = "Erro ao buscar o IP.";
    }
}

async function lookupIP() {
    const ip = document.getElementById("ipInput").value.trim();
    if (!ip) {
        document.getElementById("lookupResult").innerHTML = "Digite um IP válido.";
        return;
    }

    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("lookupResult").innerHTML = "IP inválido ou reservado.";
            return;
        }

        document.getElementById("lookupResult").innerHTML = `
            <strong>IP:</strong> ${data.ip}<br>
            <strong>País:</strong> ${data.country_name}<br>
            <strong>Cidade:</strong> ${data.city}<br>
            <strong>Provedor:</strong> ${data.org || "Desconhecido"}<br>
            <strong>Tipo:</strong> ${data.version}
        `;
    } catch (error) {
        document.getElementById("lookupResult").innerHTML = "Erro ao consultar o IP.";
    }
}

async function getWifiIP() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        document.getElementById("wifiIpResult").innerHTML = `IP do Wi-Fi: ${data.ip}`;
    } catch (error) {
        document.getElementById("wifiIpResult").innerHTML = "Erro ao buscar o IP do Wi-Fi.";
    }
}

function setLanguage(lang) {
    const translations = {
        pt: {
            title: "Consulta de IP",
            myIp: "Ver Meu IP",
            inputPlaceholder: "Digite um IP para consultar",
            lookup: "Consultar IP",
            wifi: "Consultar IP do Wi-Fi",
            contact: "Contato"
        },
        en: {
            title: "IP Lookup",
            myIp: "Check My IP",
            inputPlaceholder: "Enter an IP to lookup",
            lookup: "Lookup IP",
            wifi: "Check Wi-Fi IP",
            contact: "Contact"
        },
        ru: {
            title: "Поиск IP",
            myIp: "Мой IP",
            inputPlaceholder: "Введите IP для поиска",
            lookup: "Поиск IP",
            wifi: "Проверить IP Wi-Fi",
            contact: "Контакт"
        }
    };

    document.querySelector("h1").innerText = translations[lang].title;
    document.querySelector("button[onclick='getMyIP()']").innerText = translations[lang].myIp;
    document.getElementById("ipInput").placeholder = translations[lang].inputPlaceholder;
    document.querySelector("button[onclick='lookupIP()']").innerText = translations[lang].lookup;
    document.querySelector("button[onclick='getWifiIP()']").innerText = translations[lang].wifi;
    document.querySelector("p").innerHTML = `${translations[lang].contact}: <a href="https://t.me/azrakothx" target="_blank">@azrakothx</a>`;
}