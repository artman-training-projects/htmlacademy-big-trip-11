import {createMainEventEditTemplate} from './templates/main-event-edit';
import AbstracSmarttComponent from '../abstract-smart-component';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

export default class EventEdit extends AbstracSmarttComponent {
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

    this._invalidCity = false;
    this._invalidPrice = false;
  }

  getTemplate() {
    return createMainEventEditTemplate(Object.assign({}, this._event, this._newEvent), this._destinationsCity, this._offersByType, this._externalData);
  }

  recoveryListeners() {
    this.setSubmitEventHandler(this._setSubmitEventHandler);
    this.setResetEventHandler(this._setResetEventHandler);
    this.setCloseEditHandler(this._setCloseEditHandler);
    this.setFavoriteClickHandler(this._setFavoriteClickHandler);
    this._subscribeOnEvents();
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerenderElement();
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

  setFormOff() {
    const buttons = this.getElement().querySelectorAll(`button`);
    const inputs = this.getElement().querySelectorAll(`input`);

    buttons.forEach((button) => {
      button.disabled = true;
    });

    inputs.forEach((input) => {
      input.disabled = true;
    });
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

    this.resetFlatpickr();
    this.rerenderElement();
  }

  resetFlatpickr() {
    if (this._flatpickrFrom) {
      this._flatpickrFrom.destroy();
      this._flatpickrFrom = null;
    }

    if (this._flatpickrTo) {
      this._flatpickrTo.destroy();
      this._flatpickrTo = null;
    }
  }

  rerenderElement() {
    super.rerenderElement();
    this.applyFlatpickr();
  }

  removeElement() {
    super.removeElement();
    this.resetFlatpickr();
  }

  applyFlatpickr() {
    this.resetFlatpickr();

    const dateFromElement = this.getElement().querySelector(`[name="event-start-time"]`);
    this._flatpickrFrom = flatpickr(dateFromElement, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._newEvent.dateFrom,
    });

    const dateToElement = this.getElement().querySelector(`[name="event-end-time"]`);
    this._flatpickrTo = flatpickr(dateToElement, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._newEvent.dateTo,
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const FormElements = {
      Type: element.querySelector(`.event__type-list`),
      DESTINATION: element.querySelector(`.event__input--destination`),
      DATE_FROM: element.querySelector(`[name="event-start-time"]`),
      DATE_TO: element.querySelector(`[name="event-end-time"]`),
      PRICE: element.querySelector(`.event__input--price`),
      OFFERS: element.querySelector(`.event__available-offers`),
      SAVE: element.querySelector(`.event__save-btn`),
    };

    const isValid = () => {
      FormElements.SAVE.disabled = !(!this._invalidCity && !this._invalidPrice && !!this._newEvent.destination.name);
    };

    FormElements.Type.addEventListener(`change`, (evt) => {
      const target = evt.target;
      if (target.tagName !== `INPUT`) {
        return;
      }

      target.checked = true;
      this._newEvent.type = target.value;
      this.rerenderElement();
    });

    FormElements.DESTINATION.addEventListener(`click`, (evt) => {
      evt.target.value = ``;
      this._invalidCity = true;
      isValid();
    });

    FormElements.DESTINATION.addEventListener(`input`, (evt) => {
      const inputCity = evt.target.value;
      this._invalidCity = !this._destinationsCity.find((city) => city === inputCity);

      isValid();
      if (this._invalidCity) {
        return;
      }

      const description = (this._destinations.find((destination) => destination.name === inputCity));
      this._newEvent.destination = description;
      this.rerenderElement();
    });

    FormElements.DATE_FROM.addEventListener(`input`, (evt) => {
      const inputDate = evt.target.value;
      this._newEvent.dateFrom = inputDate;
    });

    FormElements.DATE_TO.addEventListener(`input`, (evt) => {
      const inputDate = evt.target.value;
      this._newEvent.dateTo = inputDate;
    });

    FormElements.PRICE.addEventListener(`input`, (evt) => {
      const inputPrice = evt.target.value;
      this._invalidPrice = !!inputPrice.match(/[^\d]/);

      isValid();
      this._newEvent.basePrice = inputPrice;
    });

    FormElements.OFFERS.addEventListener(`change`, (evt) => {
      const clickOfferr = evt.target;
      clickOfferr.toggleAttribute(`checked`);

      const checkedOffers = FormElements.OFFERS.querySelectorAll(`[name="event-offer"]` + `[checked=""]`);
      const checkedOffersTitle = [...checkedOffers].map((offer) => offer.value);

      const allOffers = this._eventsModel.getOffersByType().get(this._newEvent.type);
      const newCheckedOffers = allOffers.filter((offer) => checkedOffersTitle.includes(offer.title));
      this._newEvent.offers = newCheckedOffers;
      this.rerenderElement();
    });
  }
}
