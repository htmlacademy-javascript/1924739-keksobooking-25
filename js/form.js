import {getMinPrice} from './util.js';
import {OFFER_TYPES} from './data.js';

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

const roomsNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const validateCapacity = (value) => {
  const rooms = parseInt(roomsNumber.value);
  const capacity = parseInt(value);
  if (rooms === 100) {
    return capacity === 0;
  }

  return capacity !== 0 && capacity <= rooms;
};

const getCapacityError = () => {
  if (parseInt(roomsNumber.value) === 100) {
    return 'Этот вариант не для гостей';
  }
  return `Количество должно быть не больше ${roomsNumber.value}`;
};

pristine.addValidator(capacity, validateCapacity, getCapacityError);

roomsNumber.addEventListener('change', () => pristine.validate(capacity));

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    form.submit();
  }
});

export {formSetEnabled};
