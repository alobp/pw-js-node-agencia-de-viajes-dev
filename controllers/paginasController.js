import {Viaje} from "../models/ORM_Viaje.js";
import {Testimonial} from "../models/ORM_Testimoniales.js";
import Sequelize from "sequelize";



export const paginaInicio = async (req, res) => {
    // consultar 3 viajes de la base
    // NOTA: si tenemos mas de una consutla a la base de datos debemos hacer lo siguiente:
    // 1.- crear un arreglo de n-instrucciones a ejecutar en paralelo
    const promiseDB = [];
    promiseDB.push( Viaje.findAll({
        order: Sequelize.literal('rand()'),
        limit: 3
    }));
    promiseDB.push(Testimonial.findAll({
        order: Sequelize.literal('rand()'),
        limit: 3
    }));

    try {
        // 2.- ejecutar una promesa de todas las instrucciones
        // de esta manera ejecutamos todas las consultas en paraleo y ahorramos tiempo de carga
        const resultado = await Promise.all(promiseDB);

        res.render('inicio',{
            // NOTA: cuando se renderiza, el primer parametro es el nombre del archivo de las vistas en pug
            pagina: 'Inicio',
            clase:'home',
            // 3.- el resultado nos regrea de la misma manera un arreglo con las consultas realizadas a la base de datos
            data_viajes: resultado[0],
            data_testimoniales: resultado[1]
        });        
    } catch (error) {
        console.log('---------------------------')
        console.log(error);
        // console.error(error);
    }
}

export const paginaNosotros = (req, res) => {
    res.render('nosotros',{
        pagina: 'Nosotros'
    });
};

// como vamos a usar metodos de sequeliz y ademas es una consulta a la base de datos, haremos uso de ASYNC/AWAIT
export const paginaViajes = async (req, res) => {

    // Consultar el ORM de la DB
    const data_viajes = await Viaje.findAll();
    // console.log(viajes);
    res.render('viajes',{
        pagina: 'Próximos Viajes',
        data_viajes
    });
};


export const paginaViajesDetalle = async (req, res) => {
    // console.log('---------------');
    // console.log(req.params.comodin);
    const {comodin} = req.params;

    try {
        const viaje = await Viaje.findOne({
            where: {
                slug: comodin
            }
        });
        
        res.render('viaje',{
            pagina: 'Informacion Viaje',
            pagina_viaje: viaje
        });
    } catch (error) {
        console.log(error)
    }
};


// hay que mostrar los registros de la base
export const paginaTestimoniales = async (req, res) => {
    try {
        const data_testimoniales = await Testimonial.findAll();

        res.render('testimoniales',{
            pagina: 'Testimoniales',
            data_testimoniales
        });
    } catch (error) {
        console.log(error);
    }
};


// NOTA: como vamos a hacer una insercion a la DB usamos ASYNC/AWAIT
export const guardaTestimonial = async (req, res) => {
    console.log('-----------------------------');
    console.log(req.body);
    console.log('-----------------------------');
    const errores = [];    
    const {nombre, correo, mensaje } = req.body;
    
    if (nombre.trim() ==='' ) {
        errores.push({msj: 'El nombre esta vacio'});
    }
    if (correo.trim() ==='' ) {
        errores.push({msj: 'El correo esta vacio'});
    }
    if (mensaje.trim() ==='' ) {
        errores.push({msj: 'El mensaje esta vacio'});
    }

    console.log('error: '+errores.length)
    if (errores.length>0) {
        const data_testimoniales = await Testimonial.findAll();

        // console.log('********************')
        // console.log(testim_data);
        // console.log('********************')

        // si hay al menos un error:
        res.render('testimoniales',{
            // le pasamos de nuevo a la pagina los siguientes atributos
            pagina: 'Testimoniales',
            errores,
            nombre, 
            correo, 
            mensaje,
            data_testimoniales
        });
    }else{
        // si no guardamos en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
                // fecha: new DATE()
            });

            // al terminar la consulta debemos redirigir a la pagina en blanco 
            res.redirect('/testimoniales');
        } catch (error) {
            console.log('ERROR DB, testimoniales: '+error);
        }
    }
};

