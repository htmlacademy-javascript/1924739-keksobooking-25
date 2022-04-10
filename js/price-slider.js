const slider = document.querySelector('.ad-form__slider');
const input = document.querySelector('#price');

noUiSlider.create(slider, {
  range: {
    'min': 0,
    'max': 100000
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

const resetSlider = (value) => {
  if (value) {
    slider.noUiSlider.set(value);
  } else {
    slider.noUiSlider.set(0);
  }
};

const sliderSetDisabled = (disabled) => {
  if (disabled) {
    slider.setAttribute('disabled', true);
  } else {
    slider.removeAttribute('disabled');
  }
};

slider.noUiSlider.on('slide', () => {
  input.value = slider.noUiSlider.get();
});

input.addEventListener('change', (evt) => {
  resetSlider(evt.target.value);
});

const setPriceSliderChangeHandler = (handler) => {
  slider.noUiSlider.on('slide', handler);
  input.addEventListener('change', handler);
};

export {resetSlider, sliderSetDisabled, setPriceSliderChangeHandler};
