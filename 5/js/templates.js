import {OFFER_TYPES} from './util.js';

function generateBookingItem({offer, author}) {
  let featureItems = '';
  offer.features.forEach((featureName) => {
    featureItems += `<li class="popup__feature popup__feature--${featureName}"></li>`;
  });
  let photos = '';
  offer.photos.forEach((photo) => {
    photos += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
  });
  return `<article class="popup">
      <img src="${author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">${offer.title}</h3>
      <p class="popup__text popup__text--address">${offer.address}</p>
      <p class="popup__text popup__text--price">${offer.price} <span>₽/ночь</span></p>
      <h4 class="popup__type">${OFFER_TYPES[offer.type]}</h4>
      <p class="popup__text popup__text--capacity">${offer.rooms} комнаты для ${offer.guests} гостей</p>
      <p class="popup__text popup__text--time">Заезд после ${offer.checkin}, выезд до ${offer.checkout}</p>
      <ul class="popup__features">
        ${featureItems}
      </ul>
      <p class="popup__description">${offer.description}</p>
      <div class="popup__photos">
        ${photos}
      </div>
    </article>`;
}

export {generateBookingItem};