import {createMainEventEditTemplate} from './templates/mainEventEditTemplate';
import AbstracSmarttComponent from '../abstract-smart-component';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

export default class EventEditComponent extends AbstracSmarttComponent {
  constructor(event, eventsModel) {
    super();
    this._event = event;
    this._eventsModel = eventsModel;
    this._offersByType = this._eventsModel.getOffersByType();
    this._destinations = this._eventsModel.getDestinations();
    this._destinationsCity = this._eventsModel.getDestinations().map((destination) => destination.name);

    this._externalData = DefaultData;
    this._newEvent = {
      basePrice: event.basePrice,
      dateFrom: event.dateFrom,
      dateTo: event.dateTo,
      destination: {
        description: event.destination.description,
        name: event.destination.name,
        pictures: event.destination.pictures,
      },
      type: event.type,
      offers: event.offers,
    };

    this._setSubmitEventHandler = null;
    this._setResetEventHandler = null;
    this._setCloseEditHandler = null;
    this._setFavoriteClickHandler = null;
    this._subscribeOnEvents();

    this._flatpickrFrom = null;
    this._flatpickrTo = null;
    this._applyFlatpickr();
  }

  getTemplate() {
    return createMainEventEditTemplate(Object.assign({}, this._event, this._newEvent), this._destinationsCity, this._externalData);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerenderElement();
  }

  rerenderElement() {
    super.rerenderElement();
    this._applyFlatpickr();
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

  recoveryListeners() {
    this.setSubmitEventHandler(this._setSubmitEventHandler);
    this.setResetEventHandler(this._setResetEventHandler);
    this.setCloseEditHandler(this._setCloseEditHandler);
    this.setFavoriteClickHandler(this._setFavoriteClickHandler);
    this._subscribeOnEvents();
  }

  reset() {
    const event = this._event;
    this._newEvent = {
      basePrice: event.basePrice,
      dateFrom: event.dateFrom,
      dateTo: event.dateTo,
      destination: {
        description: event.destination.description,
        name: event.destination.name,
        pictures: event.destination.pictures,
      },
      type: event.type,
      offers: event.offers,
    };

    this.rerenderElement();
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setSubmitEventHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._setSubmitEventHandler = handler;
  }

  setResetEventHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._setResetEventHandler = handler;
  }

  setCloseEditHandler(handler) {
    const close = this.getElement().querySelector(`.event__rollup-btn`);
    if (close) {
      close.addEventListener(`click`, handler);
      this._setCloseEditHandler = handler;
    }
  }

  setFavoriteClickHandler(handler) {
    const favorite = this.getElement().querySelector(`.event__favorite-btn`);
    if (favorite) {
      favorite.addEventListener(`click`, handler);
      this._setFavoriteClickHandler = handler;
    }
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
      this._newEvent.offers = this._offersByType.get(target.value);
      this.rerenderElement();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`click`, (evt) => {
      evt.target.value = ``;
      this._newEvent.destination = false;
      const saveButton = this.getElement().querySelector(`.event__save-btn`);
      saveButton.disabled = true;
    });

    element.querySelector(`.event__input--destination`).addEventListener(`input`, (evt) => {
      const inputCity = evt.target.value;
      const invalidCity = !this._destinationsCity.find((city) => city === inputCity);

      const saveButton = this.getElement().querySelector(`.event__save-btn`);
      saveButton.disabled = invalidCity;

      if (invalidCity) {
        return;
      }

      const description = (this._destinations.find((destination) => destination.name === inputCity));
      this._newEvent.destination = description;
      this.rerenderElement();
    });

    element.querySelector(`.event__input--price`).addEventListener(`input`, (evt) => {
      const inputPrice = evt.target.value;
      const invalidPrice = !inputPrice.match(/[\d]/);

      const saveButton = this.getElement().querySelector(`.event__save-btn`);
      saveButton.disabled = invalidPrice;
      this._newEvent.basePrice = inputPrice;
    });
  }

  _applyFlatpickr() {
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
