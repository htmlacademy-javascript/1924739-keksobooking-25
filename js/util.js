const getMinPrice = (accommodationType) => {
  switch (accommodationType) {
    case 'palace':
      return 10000;
    case 'flat':
      return 1000;
    case 'house':
      return 5000;
    case 'bungalow':
      return 0;
    case 'hotel':
      return 3000;
    default:
      return -1;
  }
};

const OFFER_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getMinPrice, debounce, OFFER_TYPES};
