import {generateEvents} from './mock/trip-point';

import EventsModel from './models/events';
import TripController from './controllers/tripController';

const EVENTS = 10;
const trip = generateEvents(EVENTS);

const EntryPoints = {
  MAIN: document.querySelector(`.trip-main`),
  CONTROLS: document.querySelector(`.trip-controls`),
  EVENTS: document.querySelector(`.trip-events`),
};

const eventsModel = new EventsModel();
eventsModel.setEvents(trip);

const tripController = new TripController(EntryPoints.EVENTS, eventsModel);
tripController.init(EntryPoints);
