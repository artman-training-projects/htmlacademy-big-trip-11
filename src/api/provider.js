import EventAdapter from '../models/events';
import {nanoid} from 'nanoid';

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.event);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
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
          const items = createStoreStructure(events.map((event) => event.toRAW()));

          this._store.setItems(items);
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getItems());
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
          this._store.setItem(newEvent.id, newEvent.toRAW());

          return newEvent;
        });
    }

    const localNewEventId = nanoid();
    const localNewEvent = EventAdapter.clone(Object.assign(event, {id: localNewEventId}));
    this._store.setItem(localNewEvent.id, localNewEvent.toRAW());
    return Promise.resolve(localNewEvent);
  }

  updateEvent(id, event) {
    if (isOnline()) {
      return this._api.updateEvent(id, event)
      .then((newEvent) => {
        this._store.setItem(newEvent.id, newEvent.toRAW());

        return newEvent;
      });
    }

    const localEvent = EventAdapter.clone(Object.assign(event, {id}));
    this._store.setItem(id, localEvent.toRAW());
    return Promise.resolve(localEvent);
  }

  removeEvent(id) {
    if (isOnline()) {
      return this._api.removeEvent(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);
    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      const storeEvents = Object.values(this._store.getItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);

          const events = createStoreStructure([...createdEvents, ...updatedEvents]);
          this._store.setEvents(events);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
