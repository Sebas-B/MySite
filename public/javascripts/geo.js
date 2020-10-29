/*  Nombre del autor: Sebastian Eduardo Ramirez Bocanegra
           Objetivo de archivo: funcionalidad de la API de geolicalizacion
       Fecha y hora: 29/10/2020 */

//ubicación donde conenzara el mapa
const map = L.map('map-template').setView([20.9182539, -100.7601433], 13);

//plantilla del mapa 
const tileUrl = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

//Se agrega la plantilla al mapa
L.tileLayer(tileUrl).addTo(map);

//Coloca el marcador en la dirección adecuada
map.locate({enableHighAccuracy: true});
map.on('locationfound', e => {
   const coords = [e.latlng.lat, e.latlng.lng ];
   const marker = L.marker(coords);
   marker.bindPopup("Estas aqui");
   map.addLayer(marker);
 });

//Marcador de mi casa
const marker1 = L.marker([20.914904, -100.756830]);
marker1.bindPopup("Hola por ahi");
map.addLayer(marker1);


//Marcador Parroquia
const marker2 = L.marker([20.914570, -100.743673]);
marker2.bindPopup("Parroquia San Miguel de Allende");
map.addLayer(marker2);


//Marcador Charco
const marker3 = L.marker([20.918304, -100.727767]);
marker3.bindPopup("Charco del Ingenio");
map.addLayer(marker3);

//Marcador Jose Alfredo
const marker4 = L.marker([21.157673, -100.932766]);
marker4.bindPopup("Casa Jose Alfredo Jimenez");
map.addLayer(marker4);

//Marcador UTNG
const marker5 = L.marker([21.167262, -100.931060]);
marker5.bindPopup("Universidad Tecnológica del norte de Guanajuato");
map.addLayer(marker5);

//Marcador Empire State
const marker6 = L.marker([40.748433, -73.985656]);
marker6.bindPopup("Empire State");
map.addLayer(marker6);

//Londres
const marker7 = L.marker([51.507, 0.1275]);
marker7.bindPopup("Londres");
map.addLayer(marker7);

//Tokio
const marker8 = L.marker([35.703653,139.769423]);
marker8.bindPopup("Tokio");
map.addLayer(marker8);

//Argentina
const marker9 = L.marker([-34.586580,-58.431601]);
marker9.bindPopup("Argentina");
map.addLayer(marker9);

document.getElementById("select-location").addEventListener('change', function(e) {
  let coords = e.target.value.split(",");
  map.flyTo(coords, 18);
});
