const express = require('express');
const cors = require('cors'); // Importa el módulo cors
const mongoose = require('mongoose')

const app = express();

//---------------------- Implemento Express y CORS -----------------------//
app.use(cors()); // Aplica CORS antes de definir las rutas
app.use(express.json()); // Define que Express maneje los datos como JSON

// const url = "mongodb+srv://tutorialadmin:admin123@tutorial-fullstack.mj0uxna.mongodb.net/consultorio"

//------------------------------- Endpoints -------------------------------//
app.post('/login', async (req, res) => {
    console.log(req.body);
    let correo_recibido = req.body.email;
    let password_recibida = req.body.password;

    console.log("SOY EL BACKEND Y RECIBI UNA SOLICITUD POST DE LOS DATOS:");
    console.log(correo_recibido);
    console.log(password_recibida);
    console.log();

    console.log("VOY A FIJARME EN MI BASE DE DATOS SI EXISTE ALGUIEN CON ESE CORREO Y CONTRASEÑA. SI EXISTE DEVUELVO UN JSON "+
    "QUE DICE TODO OK, SINO ERROR");
    console.log();

    try {
        const url = "mongodb+srv://tutorialadmin:admin123@tutorial-fullstack.mj0uxna.mongodb.net/consultorio";
        const conexion = await mongoose.connect(url);
        console.log("Se hizo una conexión a:", conexion.connection.name);
        
        const usuariosEncontrados = await conexion.connection.db.collection('usuarios').aggregate([{ $match: { correo: correo_recibido }}]).toArray();
        console.log("USUARIOS ENCONTRADOS:");
        console.log(usuariosEncontrados);
        console.log("");

        if (usuariosEncontrados.length > 0) {
            res.status(200).json({resultado: "OK"});
        } else {
            res.status(400).json({resultado: "ERROR"});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({resultado: "ERROR"});
    }
});


// --- Defino el puerto --- //
const PORT = process.env.port || 3101;
app.listen(PORT);

console.log('----- Server listening on port -----', PORT);