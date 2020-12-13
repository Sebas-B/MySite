/*  Nombre del autor: Sebastian Eduardo Ramirez Bocanegra
           Objetivo de archivo: obtener la pagina index y poder mostrarla
       Fecha y hora: 04/12/2020 */

var express = require('express');
var router = express.Router();
var request = require('request');

/* LISTADO DE VENTAS. */
router.get('/', function(req, res, next) {
  request.get("https://nopedipermiso-crud.herokuapp.com/productos", (error, response, body) => {
   mensaje= '';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('productos', {page:'Crud', menuId:'crud', mensaje: mensaje, data: JSON.parse(body)
});
});
});

//Mostar ppr ID
router.get('/viewP/:claveProducto', async function(req, res, next) {
  request.get("https://nopedipermiso-crud.herokuapp.com/productos/:claveProducto", (error, response, body) => {
   mensaje= 'Viendo unico registro';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('viewP', {page:'Crud', menuId:'crud', mensaje: mensaje, data: JSON.parse(body)
});
});
});

//AGREGAR REGISTRO
//pantalla para agregar registro
router.get('/addP', function(req, res)  {
  mensaje = "Agregando registro";

  //Desplegar pantalla para la captura del registro
  res.render('addP', {
    mensaje: mensaje,
    title: "Agregar una venta",  //Titull de la pagina
    claveProducto: '',
    nombreProducto: '',
    precio: '',
    color: '',
    existencia: ''
 });
});

// Agregando un nuevo estudiante a través del Microservicio
router.post('/addP', function(req, res, next) {
 //Extrae los datos enviados por la forma
 let claveProducto = req.body.claveProducto;
 let nombreProducto = req.body.nombreProducto;
 let precio = req.body.precio;
 let color = req.body.color;
 let existencia = req.body.existencia;
 let errors = false;

 // Si no hay errores
 if (!errors) {
 //Encapsula datos de la forma
     var datosForma = {
     claveProducto: claveProducto,
     nombreProducto: nombreProducto,
     precio: precio,
     color: color,
     existencia: existencia
 }

 //Invoca al Microservicios
 request.post({ url: "https://nopedipermiso-crud.herokuapp.com/productos", json: datosForma }, (error, response, body) => {
     mensaje = 'El dato se ha agregado con éxito';
     if (error) {
        console.log(error);
        mensaje = 'Error: ' + error;
      }
        console.log(response);
         res.redirect('/productos'); //Redirige a Listado de Ventas
 });
 }
});

//EDITAR REGISTRO
router.get('/update/:claveProducto', (req, res) => {

   claveProducto = req.params.claveProducto;
   mensaje= 'Modificar registro ' + claveProducto;
   console.log(mensaje);

  var productosFind;
  //Buscar si la venta existe  con su numero de control
  URI = "https://nopedipermiso-crud.herokuapp.com/productos/" + claveProducto;
  console.log('URI: ' + URI);
  request.get(URI, (error, response, body) => {

  mensaje='';
  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }

 console.log("Venta Encontrada ===>");
 console.log(body);

//Desplega pantalla para modificar de estudiante
res.render('update', {
    mensaje: mensaje,
    title: "Modicando Estudiantes",  //Titull de la pagina
    claveProducto: JSON.parse(body).claveProducto,
    nombreProducto: JSON.parse(body).nombreProducto,
    precio: JSON.parse(body).precio,
    color: JSON.parse(body).color,
    existencia: JSON.parse(body).existencia
 });
});
});

// Modificando un nuevo estudiante a través del Microservicio
router.post('/update', function(req, res, next) {
 console.log('Modificando un producto');
 //Extrae los datos enviados por la forma
 let claveProducto = req.body.claveProducto;
 let precio = req.body.precio;
 let color = req.body.color;
 let existencia = req.body.existencia;

 let errors = false;

 // Si no hay errores
 if (!errors) {
 //Encapsula datos provenientes de la forma
 var datosForma = {
 claveProducto: claveProducto,
 precio: precio,
 color: color,
 existencia: existencia
 }

 //Invoca al Microservicio de modificar
 request.put({ url: "https://nopedipermiso-crud.herokuapp.com/productos", json: datosForma },
 (error, response, body) => {
 mensaje = 'El dato se ha modificado con éxito';
 if (error) {
 console.log(error);
 mensaje = 'Error: ' + error;
 }
 console.log(response);
 res.redirect('/productos'); //Redirige a Listado de Estudiantes
 });
 }
});


//DELETE
router.get('/deleteP/:_id', (req, res) => {

 id = req.params._id;

 mensaje = 'Eliminando el producto con la clave del producto' + id;

 console.log(mensaje);

 if (id) {
    //Invoca al Microservicios
    URI = "https://nopedipermiso-crud.herokuapp.com/productos/" + id;
    request.delete(URI, (error, response, body) => {
    mensaje = 'El dato se ha eliminado con éxito';
 if (error) {
    console.log(error);
    mensaje = 'Error: ' + error;
}
    console.log(response);
    res.redirect('/productos'); //Redirige a Listado de productos
  });
 }
});

module.exports = router;

