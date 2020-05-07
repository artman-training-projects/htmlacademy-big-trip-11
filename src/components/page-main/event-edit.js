import {DESTINATION_CITY, tripOffersMap} from '../../utils/const';
import {getTripDestinationDesccription, getTripDestinationPhotos} from '../../mock/trip-destination';

import AbstractSmartComponent from '../abstract-smart-component';
import {createTripEventEditHeaderTemplate} from './event-edit/event__header';
import {createTripEventEditOffersTemplate} from './event-edit/event--offers';
import {createTripEventEditDestinationTemplate} from './event-edit/event--destination';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createTripEventEditTemplate = (event, newEvent) => {
  event.type = newEvent.type || event.type;
  event.offers = newEvent.offers || event.offers;
  event.destination = newEvent.destination || event.destination;

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        ${createTripEventEditHeaderTemplate(event, event.type, event.destination, event.basePrice)}

        <section class="event__details">
          ${createTripEventEditOffersTemplate(event.offers)}

          ${createTripEventEditDestinationTemplate(event.destination)}
        </section>
      </form>
    </li>`
  );
};

const parseFormData = (formData) => {
  console.log(formData.get(`event-start-time`));
  return {
    basePrice: formData.get(`event-price`),
    dateFrom: formData.get(`event-start-time`),
    dateTo: formData.get(`event-end-time`),
    destination: {
      name: formData.get(`event-destination`),
    },
    type: formData.get(`event-type`),
  };
};

export default class MainTripDayEventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._newEvent = {};

    this._eventSubmitHandler = null;
    this._eventResetHandler = null;
    this._eventCloseClickHandler = null;
    this._favoriteClickHandler = null;
    this._subscribeOnEvents();

    this._flatpickrFrom = null;
    this._flatpickrTo = null;
    this._applyFlatpickr();
  }

  getTemplate() {
    return createTripEventEditTemplate(this._event, this._newEvent);
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);
    return parseFormData(formData);
  }

  reset() {
    this._newEvent = {};
    this.rerenderElement();
  }

  removeElement() {
    if (this._flatpickrFrom) {
      this._flatpickrFrom.destroy();
      this._flatpickrFrom = null;
    }

    if (this._flatpickrTo) {
      this._flatpickrTo.destroy();
      this._flatpickrTo = null;
    }

    super.removeElement();
  }

  rerenderElement() {
    super.rerenderElement();
    this._applyFlatpickr();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._eventSubmitHandler);
    this.setResetHandler(this._eventResetHandler);
    this.setButtonEventCloseClickHandler(this._eventCloseClickHandler);
    this.setFavoriteClickHandler(this._favoriteClickHandler);
    this._subscribeOnEvents();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, handler);
    this._eventSubmitHandler = handler;
  }

  setResetHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._eventResetHandler = handler;
  }

  setButtonEventCloseClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._eventCloseClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      const target = evt.target;
      if (target.tagName !== `INPUT`) {
        return;
      }

      target.setAttribute(`checked`, ``);
      this._newEvent.type = target.value;
      this._newEvent.offers = tripOffersMap.get(target.value);
      this.rerenderElement();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`click`, (evt) => {
      evt.target.value = ``;
      this._newEvent.destination = false;
    });

    element.querySelector(`.event__input--destination`).addEventListener(`input`, (evt) => {
      const inputCity = evt.target.value;
      const invalidCity = !DESTINATION_CITY.find((city) => city === inputCity);

      if (invalidCity) {
        return;
      }

      this._newEvent.destination = {
        description: getTripDestinationDesccription(),
        name: inputCity,
        pictures: getTripDestinationPhotos(),
      };

      this.rerenderElement();
    });

    element.querySelector(`.event__input--price`).addEventListener(`input`, (evt) => {
      const inputPrice = evt.target.value;

      if (inputPrice.match(/[^\d]/)) {
        this._newEvent.basePrice = false;
        this.rerenderElement();
      }

      this._newEvent.basePrice = inputPrice;
    });
  }

  _applyFlatpickr() {
    if (this._flatpickrFrom) {
      this._flatpickrFrom.destroy();
      this._flatpickrFrom = null;
    }

    if (this._flatpickrTo) {
      this._flatpickrTo.destroy();
      this._flatpickrTo = null;
    }


    const dateFromElement = this.getElement().querySelector(`[name="event-start-time"]`);
    this._flatpickrFrom = flatpickr(dateFromElement, {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      [`time_24hr`]: true,
      defaultDate: this._event.dateFrom || new Date(),
      onChange(timeFrom) {
        this._newEvent.dateFrom = timeFrom;
      }
    });

    const dateToElement = this.getElement().querySelector(`[name="event-end-time"]`);
    this._flatpickrTo = flatpickr(dateToElement, {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      [`time_24hr`]: true,
      defaultDate: this._event.dateTo || new Date(),
      onChange(timeTo) {
        this._newEvent.dateTo = timeTo;
      }
    });

  }
}
