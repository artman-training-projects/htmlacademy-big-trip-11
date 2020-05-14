export default class Provider {
  constructor(api) {
    this._api = api;
  }

  getEvents() {
    return this._api.getEvents();
  }

  getDestinations() {
    return this._api.getDestinations();
  }

  getOffers() {
    return this._api.getOffers();
  }

  getData() {
    return this._api.getData();
  }

  createEvent(event) {
    return this._api.createEvent(event);
  }

  updateEvent(id, data) {
    return this._api.updateEvent(id, data);
  }

  deleteEvent(id) {
    return this._api.deleteEvent(id);
  }
}
