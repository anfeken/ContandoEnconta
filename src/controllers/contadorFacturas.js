import { isNumber } from 'util';

'use strict';
const axios = require('axios');

var totalFacturas = 0;
var usuario = null;

function calcularNumeroFacturas (idUsuario, fechaInicio, fechaFinal) {
    if(validarNoVacio(idUsuario) && validarNoVacio(fechaInicio) &&
     validarNoVacio(fechaFinal)){
         if(fechaInicio > fechaFinal){
             return "Fecha inicio es posterior a fecha final";
         }
         return 0;
     }else{
         return "Te faltan parámetros";
     }
}

const validarNoVacio = (valor) => (valor !== undefined && valor !== null && valor !== '' )

function obtenerNumeroFacturas(idUsuario, fechaInicio, fechaFinal){
    axios.get(`http://34.209.24.195/facturas?id=${idUsuario}&start=${fechaInicio}&finish=${fechaFinal}`)
    .then(resp => decidirNumeroFacturas(resp, idUsuario, fechaInicio, fechaFinal))    
    .catch(ex => console.error(ex));
}

function decidirNumeroFacturas(numFacturas){
    if(isNumber(numFacturas)){
        return numFacturas;         
    }else{
        //let fechaMedia = obtenerFechaMedia
    }
}


module.exports = {
  calcularNumeroFacturas,
  obtenerNumeroFacturas
}