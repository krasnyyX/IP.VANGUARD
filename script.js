<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de IP</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h2 class="logo">IP VNG</h2>
        <nav class="navigation">
            <a href="#">Home</a>
            <a href="https://t.me/azrakothx" target="_blank">Contato</a>
        </nav>
    </header>

    <div class="container">
        <h2>Meu IP</h2>
        <button onclick="buscarMeuIP()">Ver Meu IP</button>
        <div id="meuIPResultado"></div>
    </div>

    <div class="container">
        <h2>Consulta de IP</h2>
        <div class="input-box">
            <input type="text" id="ipInput" placeholder="Digite um IP">
            <button onclick="buscarIP()">Buscar</button>
        </div>
        <div id="resultado"></div>
    </div>

    <div class="container">
        <h2>Consulta de Dispositivo</h2>
        <button onclick="buscarIPDispositivo()">Ver IP do Dispositivo</button>
        <div id="dispositivoResultado"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>