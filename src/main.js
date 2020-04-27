import {generateTrips} from './mock/trip-point';
import {RenderPosition, renderComponent} from './utils/element';

import HeaderTripInfo from './components/page-header/trip-info';
import HeaderTripMenu from './components/page-header/trip-menu';
import HeaderTripFilter from './components/page-header/trip-filter';

import TripController from './controllers/tripController';

const EVENTS = 20;
const trip = generateTrips(EVENTS);
// console.log(JSON.stringify(trip[0], null, 2));

const tripMain = document.querySelector(`.trip-main`);
renderComponent(tripMain, new HeaderTripInfo(trip), RenderPosition.AFTERBEGIN);

const tripControls = tripMain.querySelector(`.trip-controls`);
renderComponent(tripControls, new HeaderTripMenu());
renderComponent(tripControls, new HeaderTripFilter());

const tripEvents = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEvents);
tripController.render(trip);
