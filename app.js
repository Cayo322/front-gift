const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));

// Estilos CSS adicionales
const additionalStyles = `
    body {
        font-family: Arial, sans-serif;
        text-align: center;
        background-color: #f0f0f0;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .card {
        width: 400px;
        padding: 30px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    h1 {
        color: #333;
    }
    .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    input[type="number"] {
        width: calc(100% - 20px);
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .btn {
        width: 170px;
        height: 60px;
        font-size: 18px;
        background: #fff;
        border: none;
        border-radius: 50px;
        color: #000;
        outline: none;
        cursor: pointer;
        transition: all 0.4s;
    }
    .btn:hover {
        box-shadow: inset 0 0 0 4px #ef476f, 
              inset 0 0 0 8px #ffd166, 
              inset 0 0 0 12px #06d6a0,
              inset 0 0 0 16px #118ab2;
        background: #073b4c;
        color: #fff;
    }
    .button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px 16px;
  gap: 8px;
  height: 40px;
  width: 128px;
  border: none;
  background: #056bfa27;
  border-radius: 20px;
  cursor: pointer;
}

.lable {
  margin-top: 1px;
  font-size: 19px;
  line-height: 22px;
  color: #056DFA;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.button:hover {
  background: #056bfa49;
}

.button:hover .svg-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-8deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(8deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
    .gif-container {
        margin-top: 50px;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
      }
`;

// Ruta para mostrar el formulario y procesar la selección del usuario
app.get('/', (req, res) => {
    const gifNumber = req.query.gifNumber || '';

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>GIF Selector</title>
            <style>
                ${additionalStyles}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <h1>GIF Selector</h1>
                    <form action="/select-gif" method="get">
                        <div class="title">Introduce un número:</div>
                        <input type="number" id="gifNumber" name="gifNumber" value="${gifNumber}" required>
                        <button type="submit" class="btn">Ver GIF</button>
                    </form>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Ruta para manejar la selección del usuario y mostrar el GIF correspondiente
app.get('/select-gif', async (req, res) => {
    const gifNumber = req.query.gifNumber;

    try {
        // Hacer una solicitud a la API de C# con el número seleccionado
        const response = await axios.get(`http://ip172-18-0-8-coa46hi91nsg008eii4g-3000.direct.labs.play-with-docker.com/api/${gifNumber}`);
        
        // Extraer los datos del GIF de la respuesta
        const { text, href } = response.data;
        
        // Renderizar la página HTML con los datos del GIF y el formulario
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>GIF Viewer</title>
                <style>
                    ${additionalStyles}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="card">
                        <h1>GIF Viewer</h1>
                        <div class="gif-container">
                        
                            <img src="${href}" alt="GIF">
                        </div>
                        <form action="/select-gif" method="get">
                            <div class="title">Introduce un número:</div>
                            <input type="number" id="gifNumber" name="gifNumber" value="${gifNumber}" required>
                            <button type="submit" class="btn">Ver GIF</button>
                        </form>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error al obtener el GIF:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
