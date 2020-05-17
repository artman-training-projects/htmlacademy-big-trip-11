import EventAdapter from '../models/event-adapter';
import {nanoid} from "nanoid";

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (this._isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = this._createStoreStructure(events.map((event) => event.toRAW()));
          this._store.setItems(items);
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getEvents());
    return Promise.resolve(EventAdapter.parseEvents(storeEvents));
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setDestinations(destinations);
          return destinations;
        });
    }

    return Promise.resolve(this._store.getDestinations());
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setOffers(offers);
          return offers;
        });
    }

    return Promise.resolve(this._store.getOffers());
  }

  getData() {
    if (this._isOnline()) {
      return this._api.getData()
        .then((responce) => {
          const items = this._createStoreStructure(responce.events.map((event) => event.toRAW()));
          this._store.setItems(items);

          this._store.setDestinations(responce.destinations);
          this._store.setOffers(responce.offers);
          return responce;
        });
    }

    return Promise.resolve(Object.assign({},
        {events: this._store.getEvents()},
        {destinations: this._store.getDestinations()},
        {offers: this._store.getOffers()}));
  }

  createEvent(event) {
    if (this._isOnline()) {
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
    if (this._isOnline()) {
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

  deleteEvent(id) {
    if (this._isOnline()) {
      return this._api.deleteEvent(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);
    return Promise.resolve();
  }

  sync() {
    if (this._isOnline()) {
      const storeEvents = Object.values(this._store.getEvents());
      console.log(storeEvents);

      return this._api.sync(storeEvents)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdEvents = response.created;
          const updatedEvents = this._getSyncedEvents(response.updated);

          console.log(createdEvents);
          console.log(updatedEvents);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = this._createStoreStructure([...createdEvents, ...updatedEvents]);
          console.log(items);
          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _getSyncedEvents(items) {
    console.log(items);
    return items.filter(({success}) => success)
      .map(({payload}) => payload.point);
  }

  _createStoreStructure(items) {
    return items.reduce((acc, current) => {
      return Object.assign({}, acc, {
        [current.id]: current,
      });
    }, {});
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
