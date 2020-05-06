import {tripOffersMap} from '../../utils/const';
import {tripDestinationCitys, getTripDestinationDesccription, getTripDestinationPhotos} from '../../mock/trip-destination';

import AbstractSmartComponent from '../abstract-smart-component';
import {createTripEventEditHeaderTemplate} from './event-edit/event__header';
import {createTripEventEditOffersTemplate} from './event-edit/event--offers';
import {createTripEventEditDestinationTemplate} from './event-edit/event--destination';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createTripEventEditTemplate = (event, options) => {
  const {eventType, eventOffers, eventDestiantion, eventDateFrom, eventDateTo, eventPrice} = options;

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        ${createTripEventEditHeaderTemplate(event, eventType, eventDestiantion, eventPrice)}

        <section class="event__details">
          ${createTripEventEditOffersTemplate(eventOffers)}

          ${createTripEventEditDestinationTemplate(eventDestiantion)}
        </section>
      </form>
    </li>`
  );
};

const parseFormData = (formData) => {
  // console.log(formData.get(`event-type`));

  return {
    basePrice: formData.get(`event-price`),
    dateFrom: formData.get(`event-start-time`),
    dateTo: formData.get(`event-end-time`),
    destination: {
      name: formData.get(`event-destination`),
    },
    // type: formData.get(`event-type`),
  };
};

export default class MainTripDayEventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._eventDateFrom = event.dateFrom;
    this._eventDateTo = event.dateTo;
    this._eventType = event.type;
    this._eventOffers = event.offers;
    this._eventDestiantion = event.destination;
    this._basePrice = event.basePrice;

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
    return createTripEventEditTemplate(this._event, {
      eventType: this._eventType,
      eventOffers: this._eventOffers,
      eventDestiantion: this._eventDestiantion,
      eventDateFrom: this._eventDateFrom,
      eventDateTo: this._eventDateTo,
      eventPrice: this._basePrice,
    });
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    console.log(form);
    const formData = new FormData(form);
    return parseFormData(formData);
  }

  reset() {
    const event = this._event;
    this._eventDateFrom = event.dateFrom;
    this._eventDateTo = event.dateTo;
    this._eventType = event.type;
    this._eventOffers = event.offers;
    this._eventDestiantion = event.destination;
    this._basePrice = event.basePrice;
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

    element.querySelector(`.event__type-list`).addEventListener(`input`, (evt) => {
      const inputElement = document.querySelector(`[value="${evt.target.value}"]`);
      // console.log(inputElement);
      inputElement.checked = true;
      this._eventType = evt.target.value;
      this._eventOffers = tripOffersMap.get(this._eventType);
      // console.log(inputElement);
      this.rerenderElement();
    });

    element.querySelector(`.event__input--price`).addEventListener(`input`, (evt) => {
      const inputValue = evt.target.value;

      if (inputValue.match(/[^\d]/)) {
        this._basePrice = false;
        this.rerenderElement();
      }

      this._basePrice = inputValue;
    });

    element.querySelector(`.event__input--destination`).addEventListener(`click`, (evt) => {
      evt.target.value = ``;
      this._eventDestiantion.name = false;
    });

    element.querySelector(`.event__input--destination`).addEventListener(`input`, (evt) => {
      const invalidCity = !tripDestinationCitys.find((city) => city === evt.target.value);

      if (invalidCity) {
        return;
      }

      this._eventDestiantion = {
        description: getTripDestinationDesccription(),
        name: evt.target.value,
        pictures: getTripDestinationPhotos(),
      };

      this.rerenderElement();
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

    if (this._eventDateFrom) {
      const dateElement = this.getElement().querySelector(`[name="event-start-time"]`);
      this._flatpickrFrom = flatpickr(dateElement, {
        enableTime: true,
        dateFormat: `d/m/y H:i`,
        [`time_24hr`]: true,
        defaultDate: this._event.dateFrom || new Date(),
        onChange(timeFrom) {
          this._eventDateTo = timeFrom;
        }
      });
    }

    if (this._eventDateTo) {
      const dateElement = this.getElement().querySelector(`[name="event-end-time"]`);
      this._flatpickrTo = flatpickr(dateElement, {
        enableTime: true,
        dateFormat: `d/m/y H:i`,
        [`time_24hr`]: true,
        defaultDate: this._event.dateTo || new Date(),
        onChange(timeTo) {
          this._eventDateTo = timeTo;
        }
      });
    }
  }
}
