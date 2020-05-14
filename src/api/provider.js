import EventAdapter from '../models/events';

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
      return this._api.createEvent(event);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  updateEvent(id, data) {
    if (isOnline()) {
      return this._api.updateEvent(id, data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  deleteEvent(id) {
    if (isOnline()) {
      return this._api.deleteEvent(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }
}
