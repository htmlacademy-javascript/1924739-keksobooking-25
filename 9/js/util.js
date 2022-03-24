/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @throws {RangeError} If either argument is negative or min >= max
 */
const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    throw new RangeError('Invalid arguments: all arguments must be positive');
  }
  if (min >= max) {
    throw new RangeError('Invalid arguments: "min" must be less than "max" ');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @param min
 * @param max
 * @param {number} fractionalDigits
 * @returns {number}
 * @throws {RangeError} If either argument is negative or min >= max
 */
const getRandom = (min, max, fractionalDigits) => {
  if (min < 0 || max < 0) {
    throw new RangeError('Invalid arguments: all arguments must be positive');
  }
  if (min >= max) {
    throw new RangeError('Invalid arguments: "min" must be less than "max" ');
  }
  return (Math.random() * (max - min) + min).toFixed(fractionalDigits);
};

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomString = (length) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
};

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

const padZero = (num) => num.toString().length <= 1 ? `0${num}` : num;

export {getRandomInt, getRandom, getRandomElement, getRandomString, padZero, getMinPrice};