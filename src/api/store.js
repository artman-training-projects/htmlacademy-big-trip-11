export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getEvents() {
    try {
      return JSON.parse(this._storage.getEvents(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setEvent(key, value) {
    const store = this.getEvents();

    this._storage.setEvent(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeEvent(key) {
    const store = this.getEvents();
    delete store[key];

    this._storage.setEvent(
        this._storeKey,
        JSON.stringify(store)
    );
  }
}
