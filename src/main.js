import {generateTrips} from './mock/trip-point';

import EventsModel from './models/events';
import TripController from './controllers/tripController';

const EVENTS = 20;
const trip = generateTrips(EVENTS);

const EntryPoints = {
  MAIN: document.querySelector(`.trip-main`),
  CONTROLS: document.querySelector(`.trip-controls`),
  EVENTS: document.querySelector(`.trip-events`),
};

const eventsModel = new EventsModel();
eventsModel.setEvents(trip);

const tripController = new TripController(EntryPoints.EVENTS, eventsModel);
tripController.init(EntryPoints);
