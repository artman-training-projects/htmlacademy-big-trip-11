import {sortByDayFrom} from './utils';
import {generateTrips} from './mock/trip-point';

import {createTripInfoTemplate} from './components/page-header/info/trip-info';
import {createTripControlsTemplate} from './components/page-header/controls/trip-controls';
import {createTripSortTemplate} from './components/page-main/trip-sort/trip-sort';
import {createTripDaysTemplate} from './components/page-main/trip-days/trip-days';
import {createTripEventEditTemplate} from './components/page-main/event-edit/event-edit';

const EVENTS = 20;
const trips = generateTrips(EVENTS);
const tripsSortedByDateFrom = sortByDayFrom(trips);
console.log(JSON.stringify(trips[0], null, 2));

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
renderTemplate(tripMain, createTripInfoTemplate(tripsSortedByDateFrom), `afterbegin`);

const tripControls = tripMain.querySelector(`.trip-controls`);
renderTemplate(tripControls, createTripControlsTemplate());

const tripEvents = document.querySelector(`.trip-events`);
renderTemplate(tripEvents, createTripSortTemplate());
renderTemplate(tripEvents, createTripDaysTemplate(tripsSortedByDateFrom));

const tripDays = tripEvents.querySelector(`.trip-days`);
renderTemplate(tripDays, createTripEventEditTemplate(tripsSortedByDateFrom[0]), `beforebegin`);
