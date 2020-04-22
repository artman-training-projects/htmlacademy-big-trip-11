import {sortEvents} from '../utils/sorting';
import {renderTrip} from '../utils/renderTrip';
import {RenderPosition, renderComponent} from '../utils/element';


import MainEventNo from '../components/page-main/event-no';
import HeaderTripInfo from '../components/page-header/trip-info';
import HeaderTripMenu from '../components/page-header/trip-menu';
import HeaderTripFilter from '../components/page-header/trip-filter';
import MainEventsSort from '../components/page-main/trip-sort';
import MainTripDays from '../components/page-main/trip-days';

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(trip) {
    if (!trip) {
      const tripMain = document.querySelector(`.trip-main`);
      renderComponent(tripMain, new HeaderTripInfo(trip), RenderPosition.AFTERBEGIN);

      const tripControls = tripMain.querySelector(`.trip-controls`);
      renderComponent(tripControls, new HeaderTripMenu());
      renderComponent(tripControls, new HeaderTripFilter());

      const tripEvents = document.querySelector(`.trip-events`);
      renderComponent(tripEvents, new MainEventNo());
    } else {
      const tripsSortedByDateFrom = sortEvents(trip);
      // console.log(JSON.stringify(trips[0], null, 2));

      const tripMain = document.querySelector(`.trip-main`);
      renderComponent(tripMain, new HeaderTripInfo(tripsSortedByDateFrom), RenderPosition.AFTERBEGIN);

      const tripControls = tripMain.querySelector(`.trip-controls`);
      renderComponent(tripControls, new HeaderTripMenu());
      renderComponent(tripControls, new HeaderTripFilter());

      const tripEvents = document.querySelector(`.trip-events`);
      renderComponent(tripEvents, new MainEventsSort());
      renderComponent(tripEvents, new MainTripDays());

      const tripDays = tripEvents.querySelector(`.trip-days`);
      renderTrip(tripsSortedByDateFrom, tripDays);
    }
  }
}
