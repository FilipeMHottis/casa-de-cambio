import Swal from 'sweetalert2';
import './style.css';

const button = document.querySelector('#submit');
const moedaValor = [];
let listMoedas;
const urlForm = (moeda) => `https://api.exchangerate.host/latest?base=${moeda}`;

function verificador(element) {
  if (!element) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Você precisa passar uma moeda',
    });
    return false;
  }
  if (!listMoedas.includes(element.toUpperCase())) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Moeda inexistente',
    });
    return false;
  }

  return true;
}

fetch(urlForm('brl'))
  .then((response) => response.json())
  .then((data) => { listMoedas = Object.keys(data.rates); });

button.addEventListener('click', (event) => {
  event.preventDefault();
  const moedaInput = document.querySelector('#moeda').value;
  verificador(moedaInput);
});

fetch(urlForm('brl'))
  .then((response) => response.json())
  .then((data) => {
    Object.keys(data.rates).forEach((elemnt, index) => {
      const values = Object.values(data.rates);
      moedaValor.push({ Moeda: elemnt, Valor: values[index] });
    });
  });
