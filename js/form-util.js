import {sliderSetDisabled} from './price-slider.js';

const PRICE_RANGES = {
  ANY: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
  MIDDLE: [10000, 50000],
  LOW: [0, 10000],
  HIGH: [50000, Number.POSITIVE_INFINITY]
};

const form = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const formNoticeSetEnabled = (enable) => {
  if (enable) {
    form.classList.remove('ad-form--disabled');
  } else {
    form.classList.add('ad-form--disabled');
  }
  sliderSetDisabled(!enable);
  form.querySelectorAll('fieldset').forEach((fieldSet) => {
    fieldSet.disabled = !enable;
  });
};

const formFilterSetEnabled = (enable) => {
  if (enable) {
    mapFilter.classList.remove('map__filter--disabled');
  } else {
    mapFilter.classList.add('map__filter--disabled');
  }
  mapFilter.querySelectorAll('select').forEach((select) => {
    select.disabled = !enable;
  });
  mapFilter.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
    checkbox.disabled = !enable;
  });
};

const resetMapFilters = () => {
  mapFilter.querySelectorAll('select').forEach((select) => {
    select.value = 'any';
  });
  mapFilter.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
    checkbox.checked = false;
  });
};

export {formNoticeSetEnabled, formFilterSetEnabled, resetMapFilters, PRICE_RANGES};
