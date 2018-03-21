const express = require('express');

const app = express();

app.get('/contadorFacturas', (req, res) => {
    res.send('200');
});

app.listen(3000, () => console.log('Escuchando en puerto 3000'));