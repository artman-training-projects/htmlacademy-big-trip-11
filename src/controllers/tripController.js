import {SortType} from '../utils/const';
import {getEventTime} from '../utils/common';
import {RenderPosition, renderComponent, replaceComponent} from '../utils/element';

import MainEventNo from '../components/page-main/event-no';
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

const getSortedEvents = (events, sortType = SortType.EVENT) => {
  const trip = events.slice();
  let sortedEvents = [];

  switch (sortType) {
    case SortType.EVENT:
      sortedEvents = trip.sort((a, b) => Date.parse(a.dateFrom) - Date.parse(b.dateFrom));
      break;
    case SortType.TIME:
      sortedEvents = trip.sort((a, b) => getEventTime(b.dateFrom, b.dateTo) - getEventTime(a.dateFrom, a.dateTo));
      break;
    case SortType.PRICE:
      sortedEvents = trip.sort((a, b) => b.basePrice - a.basePrice);
      break;
  }

  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._noEvents = new MainEventNo();
    this._mainEventSort = new MainEventsSort();
    this._eventsSorted = null;
    this._container = container;
  }

  render(trip) {
    if (!trip) {
      renderComponent(this._container, this._noEvents);
    } else {
      this._eventsSorted = getSortedEvents(trip);
      renderComponent(this._container, this._mainEventSort);

      // const tripDays = new MainTripDays();
      // renderComponent(tripEvents, tripDays);
      renderTrip(this._eventsSorted, this._container);

      this._mainEventSort.setSortTypeSelectHandler((sortType) => {
        this._eventsSorted = getSortedEvents(this._eventsSorted, sortType);
      //   this._container.innerHTML = ``;
      //   renderTrip(this._eventsSorted, this._container);
      });
    }
  }
}
