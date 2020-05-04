import AbstractSmartComponent from '../abstract-smart-component';
import {createTripEventEditHeaderTemplate} from './event-edit/event__header';
import {createTripEventEditOffersTemplate} from './event-edit/event--offers';
import {createTripEventEditDestinationTemplate} from './event-edit/event--destination';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createTripEventEditTemplate = (event, options) => {
  const {isEventDestination} = options;
  const isBlockSaveButton = !isEventDestination;

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        ${createTripEventEditHeaderTemplate(event, isBlockSaveButton)}

        <section class="event__details">
          ${createTripEventEditOffersTemplate(event.offers)}

          ${createTripEventEditDestinationTemplate(event.destination)}
        </section>
      </form>
    </li>`
  );
};

export default class MainTripDayEventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._isEventDestination = !!event.destination.name;
    this._isFavorite = event.isFavorite;
    this._isDateFrom = event.dateFrom;
    this._isDateTo = event.dateTo;

    this._subscribeOnEvents();
    this._eventSaveClickHandler = null;
    this._eventResetClickHandler = null;
    this._eventCloseClickHandler = null;
    this._typeChoiceHandler = null;
    this._destiantionChoiceHandler = null;

    this._flatpickrFrom = null;
    this._flatpickrTo = null;
    this._applyFlatpickr();
  }

  getTemplate() {
    return createTripEventEditTemplate(this._event, {
      isEventDestination: this._isEventDestination,
    });
  }

  reset() {
    const event = this._event;
    this._isFavorite = event.isFavorite;
    this.rerenderElement();
  }

  rerenderElement() {
    super.rerenderElement();
    this._applyFlatpickr();
  }

  recoveryListeners() {
    this.setButtonEventSaveClickHandler(this._eventSaveClickHandler);
    this.setButtonEventResetClickHandler(this._eventResetClickHandler);
    this.setButtonEventCloseClickHandler(this._eventCloseClickHandler);
    this.setTypeChoiceClickHandler(this._typeChoiceHandler);
    this.setDestiantionChoiceInputHandler(this._destiantionChoiceHandler);
    this._subscribeOnEvents();
  }

  setButtonEventSaveClickHandler(handler) {
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, handler);
    this._eventSaveClickHandler = handler;
  }

  setButtonEventResetClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._eventResetClickHandler = handler;
  }

  setButtonEventCloseClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._eventCloseClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  setTypeChoiceClickHandler(handler) {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`click`, handler);
    this._typeChoiceHandler = handler;
  }

  setDestiantionChoiceInputHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, handler);
    this._destiantionChoiceHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    // element.querySelector(`.event__favorite-btn`)
    //   .addEventListener(`click`, () => {
    //     this.rerenderElement();
    //   });
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

    if (this._isDateFrom) {
      const dateElement = this.getElement().querySelector(`[name="event-start-time"]`);
      this._flatpickrFrom = flatpickr(dateElement, {
        enableTime: true,
        dateFormat: `d/m/y H:i`,
        [`time_24hr`]: true,
        defaultDate: this._event.dateFrom || new Date(),
      });
    }

    if (this._isDateTo) {
      const dateElement = this.getElement().querySelector(`[name="event-end-time"]`);
      this._flatpickrTo = flatpickr(dateElement, {
        enableTime: true,
        dateFormat: `d/m/y H:i`,
        [`time_24hr`]: true,
        defaultDate: this._event.dateTo || new Date(),
      });
    }
  }
}
