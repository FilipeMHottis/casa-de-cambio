// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
import './style.css';

const button = document.querySelector('#submit');
const moedaValor = [];
let listMoedas;
let reload = 1;

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
function criadorCubinhos(arrayMoedas) {
  arrayMoedas.forEach((moedaObj) => {
    const main1 = document.querySelector('main');
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

    main1.appendChild(section);
  });
}
function deletarMoedas() {
  if (reload > 1) {
    const main = document.querySelector('main');
    main.remove();

    const newMain = document.createElement('main');
    const body = document.querySelector('body');

    body.appendChild(newMain);
    reload -= 1;

    while (moedaValor.length > 0) {
      moedaValor.pop();
    }
  } else {
    reload += 1;
  }
}

fetch(urlForm('brl'))
  .then((response) => response.json())
  .then((data) => { listMoedas = Object.keys(data.rates); });

button.addEventListener('click', (event) => {
  event.preventDefault();

  const moedaInput = document.querySelector('#moeda').value;

  if (verificador(moedaInput)) {
    fetch(urlForm(moedaInput.toLowerCase()))
      .then((response) => response.json())
      .then((data) => {
        Object.keys(data.rates).forEach((elemnt, index) => {
          const values = Object.values(data.rates);
          moedaValor.push({ Moeda: elemnt, Valor: values[index] });
        });
      });

    deletarMoedas();
    criadorCubinhos(moedaValor);
  }
});
