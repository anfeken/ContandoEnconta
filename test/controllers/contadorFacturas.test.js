'use strict';

const contadorFacturas = require('../../src/controllers/contadorFacturas');
const expect = require('chai').expect;
const assert = require('chai').assert;
const parametros = {
    id: '4e25ce61-e6e2-457a-89f7-116404990967',
    start: '2017-02-02',
    finish: '2017-03-02'
};

const parametros2 = {
    id: '4e25ce61-e6e2-457a-89f7-116404990967',
    start: '2017-02-02',
    finish: '2017-04-02'
};

describe('módulo contadorFacturas', () => {
  describe('calcularNumeroFacturas', () => {
    it('debe ser una función', () => {
        expect(contadorFacturas.calcularNumeroFacturas).to.be.a('function');
    });

    it('retorna nulo sin parametros', () => {
        let numFacturas = contadorFacturas.calcularNumeroFacturas();
        assert.isString(numFacturas);
        assert.equal(numFacturas, "Te faltan parámetros");
    });

    it('retorna nulo con dos parametros', () => {
        let numFacturas = contadorFacturas.calcularNumeroFacturas(parametros.id, parametros.start);
        assert.isString(numFacturas);
        assert.equal(numFacturas, "Te faltan parámetros");
    });

    it('retorna error con final después de inicio', () => {
        let numFacturas = contadorFacturas.
        calcularNumeroFacturas(parametros.id, parametros.finish, parametros.start);
        assert.exists(numFacturas);
        assert.isString(numFacturas);
        assert.equal(numFacturas, "Fecha inicio es posterior a fecha final");
    });

    it('retorna totales con parametros', () => {
        contadorFacturas.calcularNumeroFacturas(parametros.id, parametros.start, parametros.finish)
        .then((totales) => {
            assert.exists(totales);
            assert.isObject(totales);
            console.log(totales);
        });
    });

    it('retorna totales con parametros, encadenado', () => {
        contadorFacturas.calcularNumeroFacturas(parametros2.id, parametros2.start, parametros2.finish)
        .then((totales) => {
            assert.exists(totales);
            assert.isObject(totales);
            console.log(totales);
        });        
    });
  });
});
  
  describe('módulo obtenerFacturas', () => {
    describe('obtenerNumeroFacturas', () => {
      it('debe ser una función', () => {
          expect(contadorFacturas.obtenerNumeroFacturas).to.be.a('function');
    });
    });
  });


