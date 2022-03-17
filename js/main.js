import {generateBookings} from './data';
import {generateBookingItem} from './templates';

const template = document.createElement('template');

generateBookings().forEach((booking) => {
  template.innerHTML += generateBookingItem(booking);
});

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(template.content);
