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
  event.dateFrom = newEvent.dateFrom || event.dateFrom;
  event.dateTo = newEvent.dateTo || event.dateTo;

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        ${createTripEventEditHeaderTemplate(event)}

        <section class="event__details">
          ${createTripEventEditOffersTemplate(event.offers)}

          ${createTripEventEditDestinationTemplate(event.destination)}
        </section>
      </form>
    </li>`
  );
};

const parseFormData = (formData) => {
  return {
    id: new Date().getMilliseconds() + Math.random(),
    basePrice: formData.get(`event-price`),
    dateFrom: new Date(formData.get(`event-start-time`)),
    dateTo: new Date(formData.get(`event-end-time`)),
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
    this._eventCloseHandler = null;
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
    return Object.assign(parseFormData(formData), this._newEvent);
  }

  reset() {
    this._newEvent = this._event;
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
    this.setCloseHandler(this._eventCloseHandler);
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

  setCloseHandler(handler) {
    const rollUp = this.getElement().querySelector(`.event__rollup-btn`);
    if (rollUp) {
      rollUp.addEventListener(`click`, handler);
      this._eventCloseHandler = handler;
    }
  }

  setFavoriteClickHandler(handler) {
    const favorite = this.getElement().querySelector(`.event__favorite-btn`);
    if (favorite) {
      favorite.addEventListener(`click`, handler);
      this._favoriteClickHandler = handler;
    }
  }

  _isValide() {

  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      const target = evt.target;
      if (target.tagName !== `INPUT`) {
        return;
      }

      target.checked = true;
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

      const saveButton = this.getElement().querySelector(`.event__save-btn`);
      saveButton.disabled = invalidCity;

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
      const invalidPrice = inputPrice.match(/[^\d]/);

      const saveButton = this.getElement().querySelector(`.event__save-btn`);
      saveButton.disabled = invalidPrice;
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
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._event.dateFrom,
    });

    const dateToElement = this.getElement().querySelector(`[name="event-end-time"]`);
    this._flatpickrTo = flatpickr(dateToElement, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._event.dateTo,
    });
  }
}
