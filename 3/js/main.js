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

const bookingTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkIns = ['12:00', '13:00', '14:00'];
const checkOuts = checkIns.slice();
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomString = (length) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
};

const padZero = (num) => num.toString().length <= 1 ? `0${num}` : num;

const bookingIds = Array.from({length: 10}, (v, i) => padZero(i + 1));

const generateBooking = (id) => {
  const location = {
    lat: getRandom(35.65, 35.7, 5),
    lng: getRandom(139.7, 139.8, 5)
  };
  const roomsNum = getRandomInt(1, 6);
  return {
    author: {
      avatar: `img/avatars/user${id}.png`
    },
    offer: {
      title: `Booking title ${id}`,
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(5, 450),
      type: getRandomElement(bookingTypes),
      rooms: roomsNum,
      guests: getRandomInt(1, roomsNum * 2),
      checkin: getRandomElement(checkIns),
      checkout: getRandomElement(checkOuts),
      features: Array.from({length: getRandomInt(1, features.length - 1)}, () => getRandomElement(features)),
      description: `Booking #${id} description`,
      photos: Array.from({length: getRandomInt(1, 5)},
        () => `https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/${getRandomString(getRandomInt(4, 18))}-${getRandomString(getRandomInt(4, 18))}.jpg`),
    },
    location
  };
};

const bookings = [];

bookingIds.forEach((id) => bookings.push(generateBooking(id)));

bookings.forEach((v) => {
  // eslint-disable-next-line no-console
  console.log(v);
});
