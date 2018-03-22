# ContandoEnconta
Aplicación en node js para consolidar conteo de factura usando un API de terceros

## Prerrequisitos

Es necesario tener instalado npm y git. Las instrucciones se dan para el uso de línea de comandos.

## Como correr

```bash
git clone https://github.com/anfeken/ContandoEnconta.git

cd ContandoEnconta

npm install

node index.js
```

Las pruebas se corren con 
```bash
 npm test 
 ```

## Modo de uso

Se ofrece un end point para un API REST, /contadorFacturas. El uso es similar al del API descrita en el ejercicio, recibe tres parámetros por URL:

### id id de usuario
### start fecha de inicio, en formato YYYY-MM-DD
### finish fecha de terminación, en formato YYYY-MM-DD

Un  par de ejemplos de URLs válidas
```url
host:3000/contadorFacturas?id=4e25ce61-e6e2-457a-89f7-116404990967&start=2017-02-02&finish=2017-03-02
```
```url
host:3000/contadorFacturas?id=4e25ce61-e6e2-457a-89f7-116404990967&start=2017-02-02&finish=2017-09-02
```

La respuesta del endpoint puede ser:

### Mensaje de texto explicando un error (parámetros inválidos, fechas incorrectas) u
### Objeto JSON con dos propiedades: totalFacturas y totalLlamadasAPI, e.g.
```js
{"totalFacturas":358,"totalLlamadasAPI":11}
```
