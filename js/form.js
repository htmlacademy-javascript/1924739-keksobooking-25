import {getMinPrice} from './util.js';
import {OFFER_TYPES} from './data.js';
import './slider.js'

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
  const minPrice = getMinPrice(evt.target.value);
  priceInput.placeholder = minPrice;
  form.querySelector('.ad-form__slider').noUiSlider.set(minPrice);
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    form.submit();
  }
});

export {formSetEnabled};
