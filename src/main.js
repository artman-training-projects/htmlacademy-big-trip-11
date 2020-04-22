import {generateTrips} from './mock/trip-point';

import TripController from './controllers/tripController';

const EVENTS = 20;
const trip = generateTrips(EVENTS);

const tripController = new TripController();

tripController.render(trip);
