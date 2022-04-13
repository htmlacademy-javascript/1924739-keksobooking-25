import {createElement, OFFER_TYPES} from './util.js';

function generateBookingItem({offer, author}) {
  const article = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  try {
    article.querySelector('.popup__avatar').src = author.avatar;
    article.querySelector('.popup__title').textContent = offer.title;
    article.querySelector('.popup__text--address').textContent = offer.address;

    const price = article.querySelector('.popup__text--price');
    price.textContent = offer.price;
    price.insertAdjacentHTML('beforeend', '<span> ₽/ночь</span>');

    article.querySelector('.popup__type').textContent = OFFER_TYPES[offer.type];

    article.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты ${offer.guests
      ? `для ${offer.guests} гостей`
      : ' - не для гостей'}`;

    article.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    const generateFeaturesFragment = (features) => {
      const featuresFragment = document.createDocumentFragment();
      features.forEach((featureName) => {
        const featureItem = createElement('<li class="popup__feature"></li>');
        featureItem.classList.add(`popup__feature--${featureName}`);
        featuresFragment.appendChild(featureItem);
      });
      return featuresFragment;
    };

    const featuresList = article.querySelector('.popup__features');
    featuresList.innerHTML = '';
    if (offer.features !== undefined && offer.features.length > 0) {
      featuresList.appendChild(generateFeaturesFragment(offer.features));
    }

    const description = article.querySelector('.popup__description');
    if (offer.description) {
      description.innerText = offer.description;
    } else {
      description.remove();
    }

    const generatePhotosFragment = (photos) => {
      const photosFragment = document.createDocumentFragment();
      photos.forEach((photoUrl) => {
        const photoImg = createElement('<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
        photoImg.src = photoUrl;
        photosFragment.appendChild(photoImg);
      });
      return photosFragment;
    };

    const photosList = article.querySelector('.popup__photos');
    photosList.innerHTML = '';
    if (offer.photos !== undefined && offer.photos.length > 0) {
      photosList.appendChild(generatePhotosFragment(offer.photos));
    }
  } catch (e) {
    article.innerHTML = '<article class="popup"></article>';
  }
  return article;
}

export {generateBookingItem};
