/*  Nombre del autor: Sebastian Eduardo Ramirez Bocanegra
           Objetivo de archivo: obtener la pagina index y poder mostrarla
       Fecha y hora: 04/12/2020 */

var express = require('express');
var router = express.Router();
var request = require('request');

/* LISTADO DE VENTAS. */
router.get('/', function(req, res, next) {
  request.get("https://nopedipermiso-crud.herokuapp.com/ventas", (error, response, body) => {
   mensaje= '';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('ventas', {page:'Crud', menuId:'crud', mensaje: mensaje, data: JSON.parse(body)
});
});
});

/*
//Mostar ppr ID
router.get('/view/:claveVentas', async function(req, res, next) {
  request.get("https://nopedipermiso-crud.herokuapp.com/:claveVentas", (error, response, body) => {
   mensaje= 'Viendo unico registro';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('view', {page:'Crud', menuId:'crud', mensaje: mensaje, data: JSON.parse(body)
  });
 });
});
*/

//Mostar ppr ID
router.get('/view/:claveVentas', async function(req, res, next) {
  request.get("https://nopedipermiso-crud.herokuapp.com/ventas/:claveVentas", (error, response, body) => {
   mensaje= 'Viendo unico registro';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('view', {page:'Crud', menuId:'crud', mensaje: mensaje, data: JSON.parse(body)
});
});
});




//AGREGAR REGISTRO
//pantalla para agregar registro
router.get('/add', function(req, res)  {
   mensaje = "Agregando registro";

  //Desplegar pantalla para la captura del registro
  res.render('add', {
    mensaje: mensaje,
    title: "Agregar una venta",  //Titull de la pagina
    claveVentas: '',
    claveVendedor: '',
    claveProducto: '',
    kilos: '',
    pagado: ''
 });
});

// Agregando un nuevo estudiante a través del Microservicio
router.post('/add', function(req, res, next) {
 //Extrae los datos enviados por la forma
 let claveVentas = req.body.claveVentas;
 let claveVendedor = req.body.claveVendedor;
 let claveProducto = req.body.claveProducto;
 let kilos = req.body.kilos;
 let date = req.body.date;
 let pagado = req.body.pagado;
 let errors = false;
 // Si no hay errores
 if (!errors) {
 //Encapsula datos de la forma
     var datosForma = {
     claveVentas: claveVentas,
     claveVendedor: claveVendedor,
     claveProducto: claveProducto,
     kilos: kilos,
     date: date,
     pagado: pagado
 }

 //Invoca al Microservicios
 request.post({ url: "https://nopedipermiso-crud.herokuapp.com/ventas", json: datosForma }, (error, response, body) => {
     mensaje = 'El dato se ha agregado con éxito';
     if (error) {
        console.log(error);
        mensaje = 'Error: ' + error;
      }
        console.log(response);
         res.redirect('/ventas'); //Redirige a Listado de Ventas
 });
 }
});


//EDITAR REGISTRO
router.get('/editar/:claveVentas', (req, res) => {
   claveVentas = req.params.claveVentas;
   mensaje= 'Modificar registro' + claveVentas;
   console.log(mensaje);

  var ventasFind;
  //Buscar si la venta existe  con su numero de control

  URI = "https://nopedipermiso-crud.herokuapp.com/ventas/"+claveVentas;
  console.log('URI: ' + URI)
  request.get(URI, (error, response, body) => {

  mensaje='';
  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }

 console.log("Venta Encontrada ===>");
 console.log(body);

//Desplega pantalla para modificar de estudiante
res.render('editar', {
    mensaje: mensaje,
    title: "Modicando Estudiantes",  //Titull de la pagina
    claveVentas: JSON.parse(body).claveVentas,
    claveVendedor: JSON.parse(body).claveVendedor,
    claveProducto: JSON.parse(body).claveProducto,
    kilos: JSON.parse(body).kilos,
    date: JSON.parse(body).date,
    pagado: JSON.parse(body).pagado
 });
});

});


// Modificando un nuevo estudiante a través del Microservicio
router.post('/editar', function(req, res, next) {

 console.log('Modificando una venta');
 //Extrae los datos enviados por la forma
 let claveVentas = req.body.claveVentas;

 let kilos = req.body.kilos;

 let pagado = req.body.pagado;

 let errors = false;

 // Si no hay errores
 if (!errors) {
 //Encapsula datos provenientes de la forma
 var datosForma = {
 claveVentas: claveVentas,

 kilos: kilos,

 pagado: pagado
 }

 //Invoca al Microservicio de modificar
 request.put({ url: "https://nopedipermiso-crud.herokuapp.com/ventas", json: datosForma },
 (error, response, body) => {
 mensaje = 'El dato se ha modificado con éxito';
 if (error) {
 console.log(error);
 mensaje = 'Error: ' + error;
 }
 console.log(response);
 res.redirect('/ventas'); //Redirige a Listado de Estudiantes
 });
 }
});


/*
//ELIMINAR REGISTRO
router.get('/delete/:claveVentas', async function(req, res, next) {
 request.get("http://localhost:4000/ventas/:claveVentas", (error, response, body) => {
    mensaje= 'Modificar registro';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('delete', {page:'Crud', menuId:'crud', mensaje: mensaje, data: JSON.parse(body)
});
});
});
*/

router.get('/delete/:claveVentas', (req, res) => {
 claveVentas = req.params.claveVentas;
 mensaje = 'Eliminando ventas con la clave de la venta' + claveVentas;
 console.log(mensaje);

 if (claveVentas) {
    //Invoca al Microservicio
    URI = "https://nopedipermiso-crud.herokuapp.com/ventas/" + claveVentas;
    request.delete(URI, (error, response, body) => {
    mensaje = 'El dato se ha eliminado con éxito';
 if (error) {
    console.log(error);
    mensaje = 'Error: ' + error;
}
    console.log(response);
    res.redirect('/ventas'); //Redirige a Listado de Estudiantes
  });
 }
});


module.exports = router;





