import {formSetEnabled} from './form.js';
import {generateBookingItem} from './templates.js';
import {getBookings, showErrorDialog} from './serverApi.js';

const COORD_DEFAULT = {lat: '35.65283', lng: '139.83948'};
const createmap = () => L.map('map-canvas');
let MAP = createmap();

const setAddress = ({lat, lng}) => {
  const addressInput = document.querySelector('#address');
  addressInput.value = `${parseFloat(lat).toFixed(5)}, ${parseFloat(lng).toFixed(5)}`;
};

const resetMainMarker = () => {
  setAddress(COORD_DEFAULT);
};

/**
 *
 * @param {[Object]} bookings
 */
const createMarkers = (bookings) => {
  const result = [];
  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg', iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -20]
  });
  bookings.forEach((booking) => {
    result.push(L.marker(booking.location, {
      icon: pinIcon
    }).bindPopup(generateBookingItem(booking)));
  });
  return result;
};

const createBookingMarkers = (map) => {
  getBookings()
    .then((bookings) => {
      createMarkers(bookings)
        .forEach((marker) => marker.addTo(map));
    }).catch((e) => {
      showErrorDialog(e, () => createBookingMarkers(map));
    });
};

const mapInit = () => {
  if (MAP) {
    MAP.remove();
  }
  MAP = createmap();
  MAP.on('load', () => {
    formSetEnabled(true);
    resetMainMarker();
  })
    .setView(COORD_DEFAULT, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },).addTo(MAP);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg', iconSize: [52, 52], iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(COORD_DEFAULT, {
    draggable: true, icon: mainPinIcon
  });

  mainPinMarker.addTo(MAP);

  mainPinMarker.on('move', (evt) => {
    setAddress(evt.target.getLatLng());
  });

  createBookingMarkers(MAP);
};


export {mapInit, resetMainMarker};
