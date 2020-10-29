/*  Nombre del autor: Sebastian Eduardo Ramirez Bocanegra
           Objetivo de archivo: funcionalidad del menu
       Fecha y hora: 29/10/2020 */
$(document).ready(function() {
 var element = $('meta[name="active-menu"]').attr('content');
 $('#' + element).addClass('active');
});
