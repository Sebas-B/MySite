/*  Nombre del autor: Sebastian Eduardo Ramirez Bocanegra
           Objetivo de archivo: obtener la pagina index y poder mostrarla
       Fecha y hora: 04/12/2020 */

var express = require('express');
var router = express.Router();
var request = require('request');

/* LISTADO DE VENTAS. */
router.get('/', function(req, res, next) {
  request.get("https://nopedipermiso-crud.herokuapp.com/vendedor", (error, response, body) => {
   mensaje= '';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('vendedor', {page:'Crud', menuId:'crud', mensaje: mensaje, data: JSON.parse(body)
});
});
});

//Mostar ppr ID
router.get('/viewVendedor/:claveVendedor', async function(req, res, next) {
  request.get("https://nopedipermiso-crud.herokuapp.com/vendedor/:claveVendedor", (error, response, body) => {
   mensaje= 'Viendo unico registro';

  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }
  console.log(JSON.parse(body));
  //Enviamos la informacion a la vista eb formato JSON
  res.render('viewVendedor', {page:'Crud', menuId:'crud', mensaje: mensaje, data: JSON.parse(body)
});
});
});


//AGREGAR REGISTRO
//pantalla para agregar registro
router.get('/addVendedor', function(req, res)  {
   mensaje = "Agregando registro";

  //Desplegar pantalla para la captura del registro
  res.render('addVendedor', {
    mensaje: mensaje,
    title: "Agregar una venta",  //Titull de la pagina
    claveVendedor: '',
    nombre: '',
    apellidos: '',
    edad: '',
    genero: ''
 });
});

// Agregando un nuevo estudiante a través del Microservicio
router.post('/addVendedor', function(req, res, next) {
 //Extrae los datos enviados por la forma
 let claveVendedor = req.body.claveVendedor;
 let nombre = req.body.nombre;
 let apellidos = req.body.apellidos;
 let edad = req.body.edad;
 let genero = req.body.genero;
 let errors = false;
 // Si no hay errores
 if (!errors) {
 //Encapsula datos de la forma
     var datosForma = {
     claveVendedor: claveVendedor,
     nombre: nombre,
     apellidos: apellidos,
     edad: edad,
     genero: genero
 }

 //Invoca al Microservicios
 request.post({ url: "https://nopedipermiso-crud.herokuapp.com/vendedor", json: datosForma }, (error, response, body) => {
     mensaje = 'El dato se ha agregado con éxito';
     if (error) {
        console.log(error);
        mensaje = 'Error: ' + error;
      }
        console.log(response);
         res.redirect('/vendedor'); //Redirige a Listado de Ventas
 });
 }
});

//EDITAR REGISTRO
router.get('/editarVendedor/:claveVendedor', (req, res) => {
   claveVendedor = req.params.claveVendedor;
   mensaje= 'Modificar registro' + claveVendedor;
   console.log(mensaje);

  var vendedorFind;
  //Buscar si la venta existe  con su numero de control
  URI = "https://nopedipermiso-crud.herokuapp.com/vendedor/"+claveVendedor;
  console.log('URI: ' + URI)
  request.get(URI, (error, response, body) => {

  mensaje='';
  if(error) { //En caso de que surja un error
      console.log(error);
      mensaje = 'Error: ' + error;
  }

 console.log("Vendedor Encontrada ===>");
 console.log(body);

//Desplega pantalla para modificar de estudiante
res.render('editarVendedor', {
    mensaje: mensaje,
    title: "Modicando Estudiantes",  //Titull de la pagina
    claveVendedor: JSON.parse(body).claveVendedor,
    nombre: JSON.parse(body).nombre,
    apellidos: JSON.parse(body).apellidos,
    edad: JSON.parse(body).edad,
    genero: JSON.parse(body).genero
 });
});

});

// Modificando un nuevo estudiante a través del Microservicio
router.post('/editarVendedor', function(req, res, next) {
 console.log('Modificando una venta');
 //Extrae los datos enviados por la forma
 let claveVendedor = req.body.claveVendedor;
 let nombre = req.body.nombre;
 let apellidos = req.body.apellidos;
 let edad = req.body.edad;
 let genero = req.body.genero;

 let errors = false;

 // Si no hay errores
 if (!errors) {
 //Encapsula datos provenientes de la forma
 var datosForma = {
 claveVendedor: claveVendedor,
 nombre: nombre,
 apellidos: apellidos,
 edad: edad,
 genero: genero
 }

//Invoca al Microservicio de modificar
 request.put({ url: "https://nopedipermiso-crud.herokuapp.com/vendedor", json: datosForma },
 (error, response, body) => {
 mensaje = 'El dato se ha modificado con éxito';
 if (error) {
 console.log(error);
 mensaje = 'Error: ' + error;
 }
 console.log(response);
 res.redirect('/vendedor'); //Redirige a Listado de Estudiantes
 });
 }
});

//Metodo DELETE
router.get('/deleteVendedor/:claveVendedor', (req, res) => {
 claveVendedor = req.params.claveVendedor;
 mensaje = 'Eliminando ventas con la clave del vendedor' + claveVendedor;
 console.log(mensaje);

 if (claveVendedor) {
    //Invoca al Microservicio
    URI = "https://nopedipermiso-crud.herokuapp.com/vendedor/" + claveVendedor;
    request.delete(URI, (error, response, body) => {
    mensaje = 'El dato se ha eliminado con éxito';
 if (error) {
    console.log(error);
    mensaje = 'Error: ' + error;
}
    console.log(response);
    res.redirect('/vendedor'); //Redirige a Listado de Estudiantes
  });
 }
});

module.exports = router;

