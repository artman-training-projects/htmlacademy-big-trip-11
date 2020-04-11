import {render} from './utils';
import {generateTrips} from './mock/trip-point';

import {createTripInfoTemplate} from './components/page-header/info/trip-info';
import {createTripControlsTemplate} from './components/page-header/controls/trip-controls';
import {createTripSortTemplate} from './components/page-main/trip-sort/trip-sort';
import {createTripDaysTemplate} from './components/page-main/trip-days/trip-days';
import {createTripEventEditTemplate} from './components/page-main/event-edit/event-edit';

const EVENTS = 20;
const trips = generateTrips(EVENTS);
console.log(JSON.stringify(trips[0], null, 2));

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createTripInfoTemplate(), `afterbegin`);

const tripControls = tripMain.querySelector(`.trip-controls`);
render(tripControls, createTripControlsTemplate());

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createTripSortTemplate());
render(tripEvents, createTripDaysTemplate(trips));

const tripDays = tripEvents.querySelector(`.trip-days`);
render(tripDays, createTripEventEditTemplate(), `beforebegin`);
