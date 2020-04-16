import {sortEvents} from './helpers/sorting';
import {renderElement, RenderPosition} from './helpers/utils';
import {generateTrips} from './mock/trip-point';

import {HeaderTripInfo} from './components/page-header/trip-info';
import {HeaderTripMenu} from './components/page-header/trip-menu';
import {HeaderTripFilter} from './components/page-header/trip-filter';
import {MainEventsSort} from './components/page-main/trip-sort';
import {MainTripDays} from './components/page-main/trip-days';
import {MainTripDay} from './components/page-main/trip-day/trip-days__item';
import {MainTripDayEvent} from './components/page-main/trip-day/trip-events__item';
// import {createTripEventEditTemplate} from './components/page-main/event-edit';

const EVENTS = 20;
const trips = generateTrips(EVENTS);
const tripsSortedByDateFrom = sortEvents(trips);
// console.log(JSON.stringify(trips[0], null, 2));

const tripMain = document.querySelector(`.trip-main`);
renderElement(tripMain, new HeaderTripInfo(tripsSortedByDateFrom).getElement(), RenderPosition.AFTERBEGIN);

const tripControls = tripMain.querySelector(`.trip-controls`);
renderElement(tripControls, new HeaderTripMenu().getElement());
renderElement(tripControls, new HeaderTripFilter().getElement());

const tripEvents = document.querySelector(`.trip-events`);
renderElement(tripEvents, new MainEventsSort().getElement());
renderElement(tripEvents, new MainTripDays().getElement());

const tripDays = tripEvents.querySelector(`.trip-days`);
// renderTemplate(tripDays, createTripEventEditTemplate(tripsSortedByDateFrom[0]), `beforebegin`);

const renderTripEvents = (events) => {
  let dayFrom;
  let daysCount = 0;
  let tripDay;

  for (const event of events) {
    if (dayFrom !== event.dateFrom.getDate()) {
      dayFrom = event.dateFrom.getDate();
      daysCount++;
      dayFrom = event.dateFrom.getDate();
      renderElement(tripDays, new MainTripDay(event, daysCount).getElement());
      tripDay = document.querySelectorAll(`.trip-events__list`);
    }

    renderElement(tripDay[daysCount - 1], new MainTripDayEvent(event).getElement());
  }
};

renderTripEvents(tripsSortedByDateFrom);
