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

getRandomInt(2, 4);

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

getRandom(2.43, 0, 2);
