// Configuracion de Express

// importamos (esta forma de escribir es de commonjs)
// const express = require('express');

// que es lo mismo que pakage:
import express from 'express';
import router from './routes/routes.js';
import db from "./config/db.js";

// 1) funcion de ejecucion
const app = express();

// 7) conectar con la base de datos
db.authenticate()
    .then( () => {
        console.log('\n>>> DB con Mysql2 y Sequelize conectada.\n');
    })
    .catch( (error) => {
        console.log('\n>>> ERROR DB:'+error);
    });


// 2) puerto, lo extraemos del deployment
// const port = process.env.PORT || 4000;

// 5) Habilitar PUG
app.set('view engine','pug');

// 6) definir nuestros Midleware
app.use( (req, res, next) => {
    // console.log(req); // se envia
    // console.log(res); // se recibe

    const anio = new Date();
    // NOTA: podemos hacer uso de el espacio de variables de EXPRESS con res.local.[nombre variable]
    // esto agregara una nueva variable que sera accesibe desde cualquier pagina o peticion GET, PUT, PUSH, DELET de HTTP
    // console.log(res.locals);
    res.locals.anioActual = anio.getFullYear();

    // 
    res.locals.nombrePagina = "Agencia de Viajaes";

    // tenemos que poner NEXT para que continue con la ejecucion del codigo
    // return next();
    next();
});

// 8) Agregar Body Parser para leer los datos de un Formulario
app.use(express.urlencoded({
    extended: true
}));

// 4) definir la carpeta publica de express
app.use(express.static('public'));

// 3) definimos rutas
app.use('/',router);

// 2.1)
// app.listen(port, () => {
//     console.log(` >>> Se ha levantado el servidor en: http://localhost:${port}`);
// });

// 2.2)
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
    console.log(`\n>>> Se ha levantado el servidor en: http://${host}:${port} \n`);
});





