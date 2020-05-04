import {getEventTime} from '../utils/common';
import {renderComponent} from '../utils/element';

import TripDayComponent from '../components/page-main/trip-day/trip-days__item';
import {SortType} from '../components/page-main/trip-sort';

import EventController from './eventController';

export default class SortController {
  constructor(container, events, onDataChange, onViewChange) {
    this._container = container;
    this._events = events;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._sortComponent = null;
  }

  renderSortedEvents(sortType = SortType.EVENT) {
    switch (sortType) {
      case SortType.EVENT:
        this._events.sort((a, b) => Date.parse(a.dateFrom) - Date.parse(b.dateFrom));
        break;
      case SortType.TIME:
        this._events.sort((a, b) => getEventTime(b.dateFrom, b.dateTo) - getEventTime(a.dateFrom, a.dateTo));
        break;
      case SortType.PRICE:
        this._events.sort((a, b) => b.basePrice - a.basePrice);
        break;
    }

    return this._render(sortType);
  }

  _render(sortType) {
    let dayFrom;
    let daysCount = 0;
    let tripDay;
    let dayTrip;

    return this._events.map((event) => {
      if (sortType !== SortType.EVENT) {
        dayTrip = new TripDayComponent();
      }

      if (dayFrom !== event.dateFrom.getDate()) {
        dayFrom = event.dateFrom.getDate();
        daysCount++;
        dayFrom = event.dateFrom.getDate();

        if (sortType === SortType.EVENT) {
          dayTrip = new TripDayComponent(daysCount, event.dateFrom);
        }

        tripDay = dayTrip.getElement().querySelector(`.trip-events__list`);
        renderComponent(this._container, dayTrip);
      }

      const eventController = new EventController(tripDay, this._onDataChange, this._onViewChange);
      eventController.render(event);
      return eventController;
    });
  }
}
