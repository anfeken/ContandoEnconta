'use strict';
const isNumber = require('util').isNumber;
const axios = require('axios');

class Totales{
    constructor(){
        this.totalFacturas = 0;
        this.totalLlamadasAPI = 0;
    }
    
    sumarTotalFacturas(numFacturas){
        this.totalFacturas += numFacturas;
    }
    
    incrementarTotalLlamadas(){
        this.totalLlamadasAPI++;
    }
    
    obtenerTotalLlamadas(){
        return this.totalLlamadasAPI;
    }

    obtenerTotalFacturas(){
        return this.totalFacturas;
    }

    reiniciarTotales(){
        this.totalFacturas = 0;
        this.totalLlamadasAPI = 0;
    }
}

const DIA_MILISEGUNDOS = 86400000;//Número de milisegundos en un día
const API_END_POINT = "http://34.209.24.195/facturas";

function validarParametrosFactura(idUsuario, fechaInicio, fechaFinal){
    if(validarNoVacio(idUsuario) && validarNoVacio(fechaInicio) && validarNoVacio(fechaFinal)){
       if(fechaInicio > fechaFinal){
           return "Fecha inicio es posterior a fecha final";
       }
       else{
           return "OK";
       }
    } else{
        return "Te faltan parámetros";
    }
    
}

function calcularNumeroFacturas (idUsuario, fechaInicio, fechaFinal) {
    let mensaje = validarParametrosFactura(idUsuario, fechaInicio, fechaFinal);
    if(mensaje === 'OK'){
        let tots = new Totales();
        let numFacturas = 0;
        let numLlamadas = 0;
        return obtenerNumeroFacturas(idUsuario, fechaInicio, fechaFinal, tots)
        .then(resp => {
            numFacturas = tots.obtenerTotalFacturas();
            numLlamadas = tots.obtenerTotalLlamadas();
            console.log("Número de facturas en intervalo %s y número de llamadas a la API %s", numFacturas, numLlamadas);
            return tots;
        });
    }         
    else{
        return mensaje;
    } 
}

const validarNoVacio = (valor) => (valor !== undefined && valor !== null && valor !== '' )

function obtenerNumeroFacturas(idUsuario, fechaInicio, fechaFinal, totales){
    return axios.get(`${API_END_POINT}?id=${idUsuario}&start=${fechaInicio}&finish=${fechaFinal}`)
    .then(resp => decidirNumeroFacturas(resp.data, idUsuario, fechaInicio, fechaFinal, totales))    
    .catch(ex => console.error(ex));
}

function decidirNumeroFacturas(numFacturas, idUsuario, fechaInicio, fechaFinal, totales){
    totales.incrementarTotalLlamadas();//Si llegamos acá. la llamada a la API fue exitosa, añadir una al contador
    if(isNumber(numFacturas)){
        totales.sumarTotalFacturas(numFacturas);
    }else{ //paso recursivo, divide y vencerás
        let fechaMedia = obtenerFechaMedia(fechaInicio, fechaFinal);
        let fechaMediaSiguiente = new Date(fechaMedia);
        fechaMediaSiguiente.setTime(fechaMediaSiguiente.getTime()+DIA_MILISEGUNDOS);
        //Se necesita el día después para no contar dos veces el mismo día
        return Promise.all([obtenerNumeroFacturas(idUsuario, fechaInicio, parteDiaISOString(fechaMedia.toISOString()), totales),
            obtenerNumeroFacturas(idUsuario, parteDiaISOString(fechaMediaSiguiente.toISOString()), fechaFinal, totales)]);
    }
    return;
}

function obtenerFechaMedia(fechaInicio, fechaFinal){
    let start = new Date(fechaInicio);
    let finish = new Date(fechaFinal);
    let middle = new Date(finish - (finish-start)/2);
    return middle;
}

function parteDiaISOString(fechaISO){
    return fechaISO.substr(0,10);
}

module.exports = {
  calcularNumeroFacturas,
  obtenerNumeroFacturas, 
  validarParametrosFactura
}