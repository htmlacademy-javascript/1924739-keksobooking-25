import {formSetEnabled} from './form.js';
import {generateBookings} from './data.js';
import {generateBookingItem} from './templates.js';

const COORD_DEFAULT = {lat: '35.65283', lng: '139.83948'};

const setAddress = ({lat, lng}) => {
  const addressInput = document.querySelector('#address');
  addressInput.value = `${parseFloat(lat).toFixed(5)}, ${parseFloat(lng).toFixed(5)}`;
};

/**
 *
 * @param {[Object]} bookings
 */
const createMarkers = (bookings) => {
  const result = [];
  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -20]
  });
  bookings.forEach((booking) => {
    result.push(L.marker(booking.location, {
      icon: pinIcon
    }).bindPopup(generateBookingItem(booking)));
  });
  return result;
};

const mapInit = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      formSetEnabled(true);
      setAddress(COORD_DEFAULT);
    })
    .setView(COORD_DEFAULT, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(COORD_DEFAULT, {
    draggable: true,
    icon: mainPinIcon
  });

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    setAddress(evt.target.getLatLng());
  });
  createMarkers(generateBookings())
    .forEach((marker) => marker.addTo(map));
};


export {mapInit};
