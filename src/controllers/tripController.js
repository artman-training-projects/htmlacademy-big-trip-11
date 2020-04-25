import {SortType} from '../utils/const';
import {getEventTime} from '../utils/common';
import {renderComponent} from '../utils/element';

import MainEventNo from '../components/page-main/event-no';
import MainEventsSort from '../components/page-main/trip-sort';
import MainTripDay from '../components/page-main/trip-day/trip-days__item';
import MainTripDays from '../components/page-main/trip-days';

import EventController from './eventController';

const renderTrip = (trip, container, onDataChange, isSorting = SortType.EVENT) => {
  let dayFrom;
  let daysCount = 0;
  let tripDay;
  let dayTrip;

  return trip.map((event) => {
    if (isSorting !== SortType.EVENT) {
      dayTrip = new MainTripDay();
      tripDay = dayTrip.getElement().querySelector(`.trip-events__list`);
    }

    if (dayFrom !== event.dateFrom.getDate()) {
      dayFrom = event.dateFrom.getDate();
      daysCount++;
      dayFrom = event.dateFrom.getDate();

      if (isSorting === SortType.EVENT) {
        dayTrip = new MainTripDay(daysCount, event.dateFrom);
        tripDay = dayTrip.getElement().querySelector(`.trip-events__list`);
      }

      renderComponent(container, dayTrip);
    }

    let eventController = new EventController(tripDay, onDataChange);
    eventController.render(event);

    return eventController;
  });
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
    this._events = [];
    this._showedEvents = [];
    this._noEvents = new MainEventNo();
    this._mainEventSort = new MainEventsSort();
    this._tripDays = new MainTripDays();
    this._eventsSorted = null;
    this._container = container;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._mainEventSort.setSortTypeSelectHandler(this._onSortTypeChange);
  }

  render(trip) {
    if (!trip) {
      renderComponent(this._container, this._noEvents);
      return;
    }

    this._events = getSortedEvents(trip);
    renderComponent(this._container, this._mainEventSort);
    renderComponent(this._container, this._tripDays);

    const daysContainer = this._tripDays.getElement();
    const newTrip = renderTrip(this._events, daysContainer, this._onDataChange);

    this._showedEvents = this._showedEvents.concat(newTrip);
  }

  _onSortTypeChange(sortType) {
    this._events = getSortedEvents(this._events, sortType);

    const container = this._tripDays.getElement();
    container.innerHTML = ``;

    const newTrip = renderTrip(this._events, container, this._onDataChange, sortType);
    this._showedEvents = newTrip;
  }

  _onDataChange(eventController, oldData, newData) {
    const index = this._events.findIndex((event) => event === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));
    eventController.render(this._events[index]);
  }
}
