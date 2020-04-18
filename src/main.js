import {sortEvents} from './utils/sorting';
import {RenderPosition, renderElement} from './utils/element';
import {generateTrips} from './mock/trip-point';

import HeaderTripInfo from './components/page-header/trip-info';
import HeaderTripMenu from './components/page-header/trip-menu';
import HeaderTripFilter from './components/page-header/trip-filter';
import MainEventsSort from './components/page-main/trip-sort';
import MainTripDays from './components/page-main/trip-days';

import {renderTrip} from './utils/renderTrip';

const EVENTS = 20;
const trips = generateTrips(EVENTS);

if (!trips) {
  console.log(`nenenene`);
} else {
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
  renderTrip(tripsSortedByDateFrom, tripDays);
}
