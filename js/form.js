import {getMinPrice, OFFER_TYPES} from './util.js';
import {postFormData} from './server-fetch.js';
import {resetSlider, setPriceSliderChangeHandler} from './price-slider.js';
import {mapInit} from './map.js';
import {showErrorDialog, showSuccessDialog} from './user-modal.js';
import {clearImagesPreview} from './form-file-chooser.js';
import {PRICE_RANGES, resetMapFilters} from './form-util.js';

const form = document.querySelector('.ad-form');

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
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
  pristine.validate(priceInput);
});

setPriceSliderChangeHandler(() => {
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

const resetFormAndFilters = () => {
  form.reset();
  resetMapFilters();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  setSubmitDisabled(true);

  postFormData(evt.target)
    .then((response) => {
      if (response.ok) {
        showSuccessDialog(resetFormAndFilters);
      } else {
        throw Error(`Не удалось отправить форму: ${response.status} ${response.statusText}`);
      }
    })
    .catch((e) => {
      showErrorDialog(`Ошибка размещения объявления: ${e.message}`);
    })
    .finally(() => {
      setSubmitDisabled(false);
    });
});

form.addEventListener('reset', () => {
  resetSlider();
  setTimeout(mapInit);
  clearImagesPreview();
});

const filters = document.querySelector('.map__filters');

const filterBooking = ({offer}) => {
  const checkType = (type) => type === offer.type;
  const checkPrice = (price) => offer.price >= PRICE_RANGES[price.toUpperCase()][0] && offer.price <= PRICE_RANGES[price.toUpperCase()][1];
  const checkRooms = (rooms) => Number.parseInt(rooms, 10) === offer.rooms;
  const checkGuests = (guests) => Number.parseInt(guests, 10) === offer.guests;

  const housingMatches = (attribute, matcherFn) => {
    const attrValue = filters.querySelector(`#housing-${attribute}`).value;
    return attrValue === 'any' || matcherFn(attrValue);
  };

  if (!housingMatches('type', checkType) || !housingMatches('price', checkPrice)
    || !housingMatches('rooms', checkRooms) || !housingMatches('guests', checkGuests)) {
    return false;
  }

  const checkedFeatures = Array.from(filters.querySelectorAll('[id^=filter]')).filter((feature) => feature.checked);

  return checkedFeatures.every((feature) => offer.features && offer.features.some((f) => feature.value === f));
};

export {filterBooking};
