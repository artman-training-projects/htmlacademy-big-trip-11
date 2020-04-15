import {sortEvents} from './helpers/sorting';
import {generateTrips} from './mock/trip-point';

// import {createTripInfoTemplate} from './components/page-header/trip-info';
import {HeaderTripInfo} from './components/page-header/trip-info';
import {createTripControlsTemplate} from './components/page-header/trip-controls';

import {createTripSortTemplate} from './components/page-main/trip-sort';
import {createTripDaysTemplate} from './components/page-main/trip-days';
import {createTripEventEditTemplate} from './components/page-main/event-edit';

import {createTripDayTemplate} from './components/page-main/trip-days/trip-days__item';
import {createTripEventsItemTemplate} from './components/page-main/trip-days/trip-events__item';

const EVENTS = 20;
const trips = generateTrips(EVENTS);
const tripsSortedByDateFrom = sortEvents(trips);
// console.log(JSON.stringify(trips[0], null, 2));

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
// renderTemplate(tripMain, createTripInfoTemplate(tripsSortedByDateFrom), `afterbegin`);
renderTemplate(tripMain, new HeaderTripInfo(tripsSortedByDateFrom).getElement(), `afterbegin`);

const tripControls = tripMain.querySelector(`.trip-controls`);
renderTemplate(tripControls, createTripControlsTemplate());


const tripEvents = document.querySelector(`.trip-events`);
renderTemplate(tripEvents, createTripSortTemplate());
renderTemplate(tripEvents, createTripDaysTemplate());

const tripDays = tripEvents.querySelector(`.trip-days`);
renderTemplate(tripDays, createTripEventEditTemplate(tripsSortedByDateFrom[0]), `beforebegin`);

const renderTripEvents = (events) => {
  let dayFrom;
  let daysCount = 0;
  let tripDay;

  for (let event of events) {
    if (dayFrom !== event.dateFrom.getDate()) {
      dayFrom = event.dateFrom.getDate();
      daysCount++;
      dayFrom = event.dateFrom.getDate();
      renderTemplate(tripDays, createTripDayTemplate(event, daysCount));
      tripDay = document.querySelectorAll(`.trip-events__list`);
    }

    renderTemplate(tripDay[daysCount - 1], createTripEventsItemTemplate(event));
  }
};

renderTripEvents(tripsSortedByDateFrom);
