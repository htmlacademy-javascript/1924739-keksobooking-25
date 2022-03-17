const formSetEnabled = (enable) => {
  const form = document.querySelector('.ad-form');
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


export {formSetEnabled};
