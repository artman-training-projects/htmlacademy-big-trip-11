import {generateTrips} from './mock/trip-point';

import TripController from './controllers/tripController';

const EVENTS = 20;
const trip = generateTrips(EVENTS);

const EntryPoints = {
  MAIN: document.querySelector(`.trip-main`),
  CONTROLS: document.querySelector(`.trip-controls`),
  EVENTS: document.querySelector(`.trip-events`),
};

const tripController = new TripController(EntryPoints.EVENTS);
tripController.init(EntryPoints, trip);

