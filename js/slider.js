const priceSlider = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

noUiSlider.create(priceSlider, {
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

priceSlider.noUiSlider.on('slide', () => {
  priceInput.value = priceSlider.noUiSlider.get();
});

priceInput.addEventListener('change', (evt) => {
  const value = evt.target.value;
  if (value) {
    priceSlider.noUiSlider.set(value);
  } else {
    priceSlider.noUiSlider.set(0);
  }
});
