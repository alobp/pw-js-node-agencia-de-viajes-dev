import express from 'express';
import {
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales, 
    paginaViajesDetalle,
    guardaTestimonial
} from '../controllers/paginasController.js';

// en este archivo agrupamos todas nuestras rutas del sitio web
const router = express.Router();

// -------------------------------------- RUTAS a Paginas --------------------------------------
router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:comodin', paginaViajesDetalle);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardaTestimonial);


// -------------------------------------- ejemplo --------------------------------------
router.get('/ejemplo-pagina', (req, res) => {
    const viajes = "mis viajes";
    // PUG en autmoatico escanea la carpeta de vistas y busca el archivo para render
    res.render('ejemplo',{
        // para mandar informacion a las vistas
        viajes
    });
});


// las exportamos
export default router;