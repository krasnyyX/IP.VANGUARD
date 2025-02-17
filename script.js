/* Resetando estilos padrão */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

/* Configuração do fundo */
body {
    background: url('background.jpg') no-repeat center center fixed;
    background-size: cover;
    color: #fff;
    text-align: center;
}

/* Estilo do cabeçalho */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
}

header h1 {
    font-size: 24px;
    font-weight: bold;
}

nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    font-size: 18px;
    transition: 0.3s;
}

nav a:hover {
    color: #00ffcc;
}

/* Centralizando o conteúdo */
main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding-top: 80px;
}

/* Container principal */
.container {
    background: rgba(0, 0, 0, 0.6);
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
}

/* Títulos */
h2 {
    font-size: 22px;
    margin-bottom: 10px;
}

/* Botões */
button {
    background: #00ffcc;
    color: #000;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin: 10px 0;
    transition: 0.3s;
}

button:hover {
    background: #00cca3;
}

/* Input */
input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 5px;
    text-align: center;
}

/* Resultados */
p {
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
}

/* Responsividade */
@media (max-width: 600px) {
    header {
        flex-direction: column;
        text-align: center;
    }
    
    nav {
        margin-top: 10px;
    }

    main {
        padding-top: 100px;
    }

    .container {
        width: 95%;
    }
}