import EventAdapter from '../models/events';
import {nanoid} from 'nanoid';

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          events.forEach((event) => this._store.setEvent(event.id, event.toRAW()));
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getEvents());
    return Promise.resolve(EventAdapter.parseEvents(storeEvents));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations();
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers();
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getData() {
    if (isOnline()) {
      return this._api.getData();
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  createEvent(event) {
    if (isOnline()) {
      return this._api.createEvent(event)
        .then((newEvent) => {
          this._store.setEvent(newEvent.id, newEvent.toRAW());

          return newEvent;
        });
    }

    const localNewEventId = nanoid();
    const localNewEvent = EventAdapter.clone(Object.assign(event, {id: localNewEventId}));
    this._store.setEvent(localNewEvent.id, localNewEvent.toRAW());
    return Promise.resolve(localNewEvent);
  }

  updateEvent(id, event) {
    if (isOnline()) {
      return this._api.updateEvent(id, event)
      .then((newEvent) => {
        this._store.setEvent(newEvent.id, newEvent.toRAW());

        return newEvent;
      });
    }

    const localEvent = EventAdapter.clone(Object.assign(event, {id}));
    this._store.setEvent(id, localEvent.toRAW());
    return Promise.resolve(localEvent);
  }

  removeEvent(id) {
    if (isOnline()) {
      return this._api.removeEvent(id)
        .then(() => this._store.removeEvent(id));
    }

    this._store.removeEvent(id);
    return Promise.resolve();
  }
}
