#!/usr/bin/env node

const programaContador = require('commander');

const contadorFacturas = require('../controllers/contadorFacturas');

programaContador
  .version('0.0.1')
  .description('Contador de facturas entre dos fechas distintas');

programaContador
    .command('contadorFacturas <userId> <inicio> <final>')
    .alias('cF')
    .description('Cuenta facturas entre fecha inicio y fecha final, para el usuario identificado con userId')
    .action((userId, inicio, final) => {
        let mensaje = contadorFacturas.validarParametrosFactura(userId, inicio, final);
        if(mensaje === 'OK'){
            contadorFacturas.calcularNumeroFacturas(userId, inicio, final)
                .then(totales => {
                    console.info("Total de facturas es %s, total de llamadas a la API externa fue %s",
                     totales.totalFacturas, totales.totalLlamadasAPI);
                });        
        }else{
            console.error(mensaje);
        }
    });

  programaContador.parse(process.argv);