import {getMinPrice, OFFER_TYPES} from './util.js';
import './slider.js';
import {postFormData} from './server-api.js';
import {resetSlider} from './slider.js';
import {mapInit} from './map.js';
import {showErrorDialog, showSuccessDialog} from './user-modal.js';

const form = document.querySelector('.ad-form');

// const formNoticeSetEnabled = (enable) => {
//   if (enable) {
//     form.classList.remove('ad-form--disabled');
//   } else {
//     form.classList.add('ad-form--disabled');
//   }
//   form.querySelectorAll('fieldset').forEach((fieldSet) => {
//     fieldSet.disabled = !enable;
//   });
// };
//
// const formFilterSetEnabled = (enable) => {
//   const mapFilter = document.querySelector('.map__filters');
//   if (enable) {
//     mapFilter.classList.remove('map__filter--disabled');
//   } else {
//     mapFilter.classList.add('map__filter--disabled');
//   }
//   mapFilter.querySelectorAll('select').forEach((select) => {
//     select.disabled = !enable;
//   });
// };

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    showErrorDialog(new Error('Не верно заполнены значения формы'));
    return;
  }

  setSubmitDisabled(true);

  postFormData(evt.target)
    .then((response) => {
      if (response.ok) {
        showSuccessDialog(() => form.reset());
      } else {
        throw Error(`Не удалось отправить форму: ${response.status} ${response.statusText}`);
      }
    })
    .catch((e) => {
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

const filterBooking = ({offer}) => {
  const filters = document.querySelector('.map__filters');

  const Prices = {
    ANY: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
    MIDDLE: [10000, 50000],
    LOW: [0, 10000],
    HIGH: [50000, Number.POSITIVE_INFINITY]
  };

  const typeMatcher = (type) => type === offer.type;
  const priceMatcher = (price) => offer.price >= Prices[price.toUpperCase()][0] && offer.price <= Prices[price.toUpperCase()][1];
  const roomMatcher = (rooms) => +rooms === offer.rooms;
  const guestsMatcher = (guests) => +guests === offer.guests;

  const housingMatch = (attribute, matcherFn) => {
    const attrValue = filters.querySelector(`#housing-${attribute}`).value;
    return attrValue === 'any' || matcherFn(attrValue);
  };

  if (!housingMatch('type', typeMatcher) || !housingMatch('price', priceMatcher)
    || !housingMatch('rooms', roomMatcher) || !housingMatch('guests', guestsMatcher)) {
    return false;
  }

  const featureElements = Array.from(filters.querySelectorAll('[id^=filter]'));

  return featureElements.every((feature) => offer.features &&
    (!feature.checked || offer.features.some((f) => feature.id.endsWith(`-${f}`))));
};

export {filterBooking};
