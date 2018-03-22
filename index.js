const express = require('express');
const contadorFacturas = require('./src/controllers/contadorFacturas');

const app = express();

app.get('/contadorFacturas', (req, res) => {
    let userId = req.query.id;
    let startDate = req.query.start;
    let finishDate = req.query.finish;
    let mensaje = contadorFacturas.validarParametrosFactura(userId, startDate, finishDate);
    if(mensaje === 'OK'){
        contadorFacturas.calcularNumeroFacturas(userId, startDate, finishDate)
        .then(totales => {            
            res.send(totales);
        });        
    }else{
        res.send(mensaje);
    }
    
});

app.listen(3000, () => console.log('Contador facturas escuchando en puerto 3000'));