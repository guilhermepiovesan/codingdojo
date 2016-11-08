var test = require('tape');

var arrayUnidade = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
var dezena = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];

function capitalizeFirstLetter(string) {
    if (string == undefined || !string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var terminaEmZero = function(valor) {
  return valor % 10 == 0 ? true : false;
}

function tratarNumero(valor, tipoNumero) {
  var valorPorExtenso = '';

  if (valor > 0){

    if (valor <= 19) {
      return arrayUnidade[valor];
    } else if (terminaEmZero(valor)) {
      return ' e ' + dezena[valor.toString().charAt(0)];
    } else {
      return ' e ' + arrayUnidade[valor.toString().charAt(1)];
    }
  }
}

function tratarReais(reais) {
  var reaisPorExtenso = tratarNumero(reais, 'real');
  reaisPorExtenso += tratarUnidadeMonetaria(reais, 'real', 'reais');
  return reaisPorExtenso;
}

function tratarCentavos(centavos) {
  var centavosPorExtenso = '';
  if(centavos != '00') {
    centavosPorExtenso = tratarNumero(centavos, 'centavo');
    centavosPorExtenso += tratarUnidadeMonetaria(centavos, 'centavo', 'centavos');
  }
  return centavosPorExtenso;
}

var tratarUnidadeMonetaria = function(valor, unidadeMonetaria, unidadeMonetariaPlural) {
  return  valor > 1 ? ' ' + unidadeMonetariaPlural : ' ' + unidadeMonetaria;
}

var retornaReais = function(valor) {
  return parseInt(valor.split(',')[0], 10);
}
var retornaCentavos = function(valor) {
  return parseInt(valor.split(',')[1], 10);
}

var converteValorEmExtenso = function(valor) {
  var arrayValores = valor.split(',');

  var valorPorExtenso = '';

  var reais = retornaReais(valor); 
  var centavos = retornaCentavos(valor); 

  valorPorExtenso = tratarReais(reais);
  valorPorExtenso += tratarCentavos(centavos);
  valorPorExtenso = capitalizeFirstLetter(valorPorExtenso);
  
  return valorPorExtenso;  
}

test('testando cheque', function (t) {

  t.equal(converteValorEmExtenso('1,00'), 'Um real', 'Deveria retornar Um real');
  t.equal(converteValorEmExtenso('2,00'), 'Dois reais', 'Deveria retornar Dois reais');
  t.equal(converteValorEmExtenso('3,00'), 'Três reais', 'Deveria retornar Tres reais');
  t.equal(converteValorEmExtenso('3,40'), 'Três reais e quarenta centavos', 'Deveria retornar Tres reais e quarenta centavos');
  t.equal(converteValorEmExtenso('15,00'), 'Quinze reais', 'Deveria retornar Quinze reais');
  t.equal(converteValorEmExtenso('22,00'), 'Vinte e dois reais', 'Deveria retornar Vinte e dois reais');
  t.equal(converteValorEmExtenso('29,03'), 'Vinte e nove reais e três centavos', 'Deveria retornar Vinte e nove reais e três <centavos></centavos>');
  t.equal(converteValorEmExtenso('29,33'), 'Vinte e nove reais e trinta e três centavos', 'Deveria retornar Vinte e nove reais e trinta e três <centavos></centavos>');
  
  t.end();

});