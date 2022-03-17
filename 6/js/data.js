import {getRandom, getRandomElement, getRandomInt, padZero} from './util.js';

const bookingTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkIns = ['12:00', '13:00', '14:00'];
const checkOuts = checkIns.slice();
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

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
      photos: Array.from({length: getRandomInt(1, 5)}, () => getRandomElement(photos)),
    },
    location
  };
};

const generateBookings = () => {
  const bookingIds = Array.from({length: 10}, (v, i) => padZero(i + 1));
  return bookingIds.map((id) => generateBooking(id));
};

export {generateBookings};
