import $ from 'jquery'
import Inputmask from 'inputmask'



const inputElement = document.getElementById('myInput');

const phoneMask = new Inputmask("(999) 999-9999");
const dateMask = new Inputmask("99/99/9999");

document.getElementById('setPhoneMask').addEventListener('click', () => {
    console.log('q');
    phoneMask.mask(inputElement); // Применить маску телефона
});

document.getElementById('setDateMask').addEventListener('click', () => {
    console.log('2');

    dateMask.mask(inputElement); // Применить маску даты
});
