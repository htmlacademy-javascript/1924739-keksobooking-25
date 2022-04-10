const formNoticeSetEnabled = (enable) => {
  const form = document.querySelector('.ad-form');
  if (enable) {
    form.classList.remove('ad-form--disabled');
  } else {
    form.classList.add('ad-form--disabled');
  }
  form.querySelectorAll('fieldset').forEach((fieldSet) => {
    fieldSet.disabled = !enable;
  });
};

const formFilterSetEnabled = (enable) => {
  const mapFilter = document.querySelector('.map__filters');
  if (enable) {
    mapFilter.classList.remove('map__filter--disabled');
  } else {
    mapFilter.classList.add('map__filter--disabled');
  }
  mapFilter.querySelectorAll('select').forEach((select) => {
    select.disabled = !enable;
  });
  mapFilter.querySelectorAll('input[type=checkbox]').forEach((select) => {
    select.disabled = !enable;
  });
};

export {formNoticeSetEnabled, formFilterSetEnabled};
