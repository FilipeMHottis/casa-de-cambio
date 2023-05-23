// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
import './style.css';

const button = document.querySelector('#submit');
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
function criadorCubinhos(moedaObj) {
  const main = document.querySelector('main');
  const section = document.createElement('section');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const number = Number(moedaObj.Valor).toFixed(3);

  p1.innerHTML = moedaObj.Moeda;
  p2.innerHTML = number;
  p2.classList.add('valor');

  section.appendChild(p1);
  section.appendChild(p2);
  section.classList.add('caixa');

  main.appendChild(section);
}

fetch(urlForm('brl'))
  .then((response) => response.json())
  .then((data) => { listMoedas = Object.keys(data.rates); });

button.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('main').innerHTML = '';

  const moedaInput = document.querySelector('#moeda').value;

  if (verificador(moedaInput)) {
    fetch(urlForm(moedaInput.toLowerCase()))
      .then((response) => response.json())
      .then((data) => {
        Object.keys(data.rates).forEach((elemnt, index) => {
          const values = Object.values(data.rates);
          criadorCubinhos({ Moeda: elemnt, Valor: values[index] });
        });
      });
  }
});
