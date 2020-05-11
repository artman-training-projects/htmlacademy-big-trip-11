import EventAdapter from './models/eventsAdapter';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({
      url: `points`,
      method: Method.GET,
    })
      .then((responce) => responce.json())
      .then(EventAdapter.parseEvents);
  }

  getDestinations() {
    return this._load({
      url: `destinations`,
      method: Method.GET,
    })
      .then((response) => response.json());
  }

  getOffers() {
    return this._load({
      url: `offers`,
      method: Method.GET,
    })
      .then((response) => response.json());
  }

  getData() {
    return Promise.all([
      this.getEvents(),
      this.getDestinations(),
      this.getOffers(),
    ])
      .then((responce) => {
        const [events, destinations, offers] = responce;
        return {
          events,
          destinations,
          offers,
        };
      });
  }

  createEvent(event) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(event.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(EventAdapter.parseEvent);
  }

  updateEvent(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then(EventAdapter.parseEvent);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
