async function buscarIP() {
    let ip = document.getElementById('ipInput').value || '';
    let url = ip ? `http://ip-api.com/json/${ip}?fields=status,message,query,country,regionName,city,isp,org,as,lat,lon,proxy` 
                 : `http://ip-api.com/json/?fields=status,message,query,country,regionName,city,isp,org,as,lat,lon,proxy`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "success") {
            throw new Error(data.message || "Erro ao buscar informações.");
        }

        exibirResultado(data);
    } catch (error) {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">Erro ao buscar informações.</p>';
    }
}

function exibirResultado(data) {
    const googleMapsUrl = `https://www.google.com/maps?q=${data.lat},${data.lon}`;

    const resultado = `
        <p><strong>IP:</strong> ${data.query}</p>
        <p><strong>Provedor:</strong> ${data.isp}</p>
        <p><strong>Organização:</strong> ${data.org}</p>
        <p><strong>País:</strong> ${data.country}</p>
        <p><strong>Estado:</strong> ${data.regionName}</p>
        <p><strong>Cidade:</strong> ${data.city}</p>
        <p><strong>ASN:</strong> ${data.as}</p>
        <p><strong>Latitude:</strong> ${data.lat}</p>
        <p><strong>Longitude:</strong> ${data.lon}</p>
        <p><strong>VPN/Proxy:</strong> ${data.proxy ? "Sim" : "Não"}</p>
        <p><a href="${googleMapsUrl}" target="_blank">📍 Ver localização no Google Maps</a></p>
    `;

    document.getElementById('resultado').innerHTML = resultado;
}