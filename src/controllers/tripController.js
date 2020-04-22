import {sortEvents} from '../utils/sorting';
import {RenderPosition, renderComponent, replaceComponent} from '../utils/element';

import NoEvents from '../components/no-events';
import HeaderTripInfo from '../components/page-header/trip-info';
import HeaderTripMenu from '../components/page-header/trip-menu';
import HeaderTripFilter from '../components/page-header/trip-filter';
import MainEventsSort from '../components/page-main/trip-sort';
import MainTripDay from '../components/page-main/trip-day/trip-days__item';
import MainTripDays from '../components/page-main/trip-days';
import MainTripDayEvent from '../components/page-main/trip-day/trip-events__item';
import MainTripDayEventEdit from '../components/page-main/event-edit';

const renderTripEvent = (event, day) => {
  const replaceEventToEdit = () => {
    replaceComponent(tripEventEdit, tripEvent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEditToEvent = () => {
    replaceComponent(tripEvent, tripEventEdit);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
    }
  };

  const tripEvent = new MainTripDayEvent(event);
  tripEvent.setButtonRollupClickHandler(() => {
    replaceEventToEdit();
  });

  const tripEventEdit = new MainTripDayEventEdit(event);
  tripEventEdit.setButtonEventSaveClick(() => {
    replaceEditToEvent();
  });
  tripEventEdit.setButtonEventResetClick(() => {
    replaceEditToEvent();
  });

  renderComponent(day, tripEvent);
};

const renderTrip = (events, tripDays) => {

  let dayFrom;
  let daysCount = 0;
  let tripDay;

  for (const event of events) {
    if (dayFrom !== event.dateFrom.getDate()) {
      dayFrom = event.dateFrom.getDate();
      daysCount++;
      dayFrom = event.dateFrom.getDate();
      const dayTrip = new MainTripDay(daysCount, event);
      tripDay = dayTrip.getElement().querySelector(`.trip-events__list`);
      renderComponent(tripDays, dayTrip);
    }

    renderTripEvent(event, tripDay);
  }
};

export default class TripController {
  constructor(container) {
    this._noEvents = new NoEvents();
    this._mainEventSort = new MainEventsSort();
    this._container = container;
  }

  render(trip) {
    if (!trip) {
      this._noEvents.getTemplate();
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
