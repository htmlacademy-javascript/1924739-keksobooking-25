import {generateBookings} from './data.js';
import {generateBookingItem} from './templates.js';

const template = document.createElement('template');

generateBookings().forEach((booking) => {
  template.innerHTML += generateBookingItem(booking);
});

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(template.content);
