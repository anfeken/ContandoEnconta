# ContandoEnconta
Aplicación en node js para consolidar conteo de facturas usando un API de terceros

## Prerrequisitos

Es necesario tener instalado npm y git. Las instrucciones se dan para el uso de línea de comandos.

## Descarga

```bash
git clone https://github.com/anfeken/ContandoEnconta.git

cd ContandoEnconta

npm install
```

## Como correr (Aplicación CLI)

```bash
cd ContandoEnconta

node src/ui/commandui.js contadorFacturas userId fechaInicio fechaFinal
```

También puede ser instalada como una aplicación de línea de comandos, de la siguiente manera:

```bash
cd ContandoEnconta

npm link

contandoEnconta contadorFacturas userId fechaInicio fechaFinal
```
## Modo de uso (CLI)

Se ofrece una utilidad por línea de comandos. como se describió en el punto anterior, puede ser ejecutada de dos maneras distintas. La segunda manera es más clara, pero requiere un usuario con permisos para escribir en /usr/local/bin.

Sea cual sea el modo de uso, la aplicación recibe tres parámetros:

### id de usuario
### fecha de inicio, en formato YYYY-MM-DD
### fecha de terminación, en formato YYYY-MM-DD

Un  par de ejemplos de uso válidos
```bash
contandoenconta contadorFacturas 4e25ce61-e6e2-457a-89f7-116404990967 2017-02-02 2017-03-02
```
```url
contandoenconta contadorFacturas 4e25ce61-e6e2-457a-89f7-116404990967 2017-02-02 2017-09-02
```
La respuesta de la aplicación puede ser:

### Mensaje de texto explicando un error (parámetros inválidos, fechas incorrectas) u
### mensaje mostrando el total de facturas y total de llamadas a la API, e.g.

```bash
Total de facturas es 99, total de llamadas a la API externa fue 2
```

## Correr pruebas

Las pruebas se corren usando npm test
```bash
cd ContandoEnconta
npm test 
```

## Como correr (API REST)

```bash
cd ContandoEnconta

node index.js
```

## Modo de uso (API REST)

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

