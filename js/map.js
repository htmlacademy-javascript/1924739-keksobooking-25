import {filterBooking} from './form.js';
import {generateBookingItem} from './templates.js';
import {fetchBookings} from './server-fetch.js';
import {showErrorDialog} from './user-modal.js';
import {formFilterSetEnabled, formNoticeSetEnabled} from './form-util.js';
import {debounce} from './util.js';

const COORD_DEFAULT = {lat: '35.65283', lng: '139.83948'};
const MAX_BOOKINGS_NUMBER = 10;
const createMap = () => L.map('map-canvas');
let map = createMap();
const markerGroup = L.layerGroup().addTo(map);

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
  const results = [];
  const pinIcon = L.icon({
    iconUrl: '/img/pin.svg', iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -20]
  });
  bookings.forEach((booking) => {
    const marker = L.marker(booking.location, {
      icon: pinIcon
    });
    marker.bindPopup(generateBookingItem(booking));
    results.push(marker);
  });
  return results;
};

const createBookingMarkers = () => {
  formFilterSetEnabled(false);
  fetchBookings()
    .then((bookings) => {
      const filtered = bookings.filter(filterBooking).slice(0, MAX_BOOKINGS_NUMBER);
      markerGroup.clearLayers();
      createMarkers(filtered).forEach((m) => m.addTo(markerGroup));
      formFilterSetEnabled(true);
    })
    .catch((e) => {
      showErrorDialog(e.message, () => createBookingMarkers());
    });
};

const createMarkersDebounced = debounce(createBookingMarkers);

const mapInit = () => {
  if (map) {
    map.remove();
  }
  map = createMap();
  markerGroup.addTo(map);

  map.on('load', () => {
    formNoticeSetEnabled(true);
    resetMainMarker();
    createBookingMarkers();
  })
    .setView(COORD_DEFAULT, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '/img/main-pin.svg', iconSize: [52, 52], iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(COORD_DEFAULT, {
    draggable: true, icon: mainPinIcon
  });

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    setAddress(evt.target.getLatLng());
  });

  const filters = document.querySelector('.map__filters');

  filters.addEventListener('change', () => {
    createMarkersDebounced();
  });
};


export {mapInit, resetMainMarker};
