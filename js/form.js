import {getMinPrice} from './util.js';
import {OFFER_TYPES} from './data.js';
import './slider.js';
import {showErrorDialog} from './serverApi.js';
import {resetSlider} from './slider.js';
import {mapInit} from './map.js';

const form = document.querySelector('.ad-form');

const formSetEnabled = (enable) => {
  const mapFilter = document.querySelector('form .map__filter');
  if (enable) {
    form.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filter--disabled');

  } else {
    form.classList.add('ad-form--disabled');
    mapFilter.classList.add('map__filter--disabled');
  }
  form.querySelectorAll('fieldset').forEach((fieldSet) => {
    fieldSet.disabled = !enable;
  });
  mapFilter.querySelectorAll('fieldset').forEach((fieldSet) => {
    fieldSet.disabled = !enable;
  });
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const accommodationTypeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');

const validatePrice = (value) => value >= getMinPrice(accommodationTypeSelect.value);

const getPriceErrorMessage = () => `Минимальная цена для жилья '${OFFER_TYPES[accommodationTypeSelect.value]}' должна быть '${getMinPrice(accommodationTypeSelect.value)}' руб.`;

pristine.addValidator(priceInput, validatePrice, getPriceErrorMessage);

accommodationTypeSelect.addEventListener('change', (evt) => {
  priceInput.placeholder = getMinPrice(evt.target.value);
  pristine.validate(priceInput);
});

const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');

timeInSelect.addEventListener('change', (evt) => {
  timeOutSelect.value = evt.target.value;
});

timeOutSelect.addEventListener('change', (evt) => {
  timeInSelect.value = evt.target.value;
});

const roomsSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');

const validateCapacity = (value) => {
  const rooms = parseInt(roomsSelect.value, 10);
  const capacity = parseInt(value, 10);
  if (rooms === 100) {
    return capacity === 0;
  }

  return capacity !== 0 && capacity <= rooms;
};

const getCapacityError = () => {
  if (parseInt(roomsSelect.value, 10) === 100) {
    return 'Этот вариант не для гостей';
  }
  return `Количество должно быть не больше ${roomsSelect.value}`;
};

pristine.addValidator(capacitySelect, validateCapacity, getCapacityError);

roomsSelect.addEventListener('change', () => pristine.validate(capacitySelect));

const setSubmitDisabled = (value) => {
  form.querySelector('.ad-form__submit').disabled = value;
};

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    showErrorDialog(new Error('Не верно заполнены значения формы'));
    return;
  }

  fetch('https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: new FormData(evt.target)
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error(`Не удалось отправить форму: ${response.status} ${response.statusText}`);
    })
    .then((result) => {
      console.log('Успех: ', JSON.stringify(result));
    })
    .catch((e) => {
      console.error('Ошибка: ', e.message, e);
      showErrorDialog(e);
    })
    .finally(() => {
      setSubmitDisabled(false);
    });
});

form.addEventListener('reset', () => {
  resetSlider();
  setTimeout(mapInit);
});

export {formSetEnabled};
