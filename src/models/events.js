import {FilterType} from '../controllers/filter-controller';
import {getFilteredEvents} from '../controllers/helpers/get-filtered-events';
import {getRandomId} from '../utils/common';

export default class Events {
  constructor() {
    this._events = [];
    this._OffersByType = [];
    this._destinations = [];
    this._currentFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  addEvent(event) {
    if (!event.id) {
      event.id = getRandomId();
    }

    this._events = [].concat(event, this._events);
    this._callHandlers(this._dataChangeHandlers);
  }

  setEvents(events) {
    this._events = events ? Array.from(events) : [];
    this._callHandlers(this._dataChangeHandlers);
  }

  setOffersByType(offers) {
    this._OffersByType = offers ? new Map() : [];
    for (const item of offers) {
      this._OffersByType.set(item.type, item.offers);
    }
  }

  setDestinations(destinations) {
    this._destinations = destinations ? Array.from(destinations) : [];
  }

  setFilterType(filterType) {
    this._currentFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  getAllEvents() {
    return this._events;
  }

  getOffersByType() {
    return this._OffersByType;
  }

  getDestinations() {
    return this._destinations;
  }

  getFilteredEvents() {
    return getFilteredEvents(this._events, this._currentFilterType);
  }

  getFilterType() {
    return this._currentFilterType;
  }

  updateEvent(id, event) {
    const index = this._events.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  removeEvent(id) {
    const index = this._events.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  setFilterTypeChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
