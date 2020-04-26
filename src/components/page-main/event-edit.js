import AbstractSmartComponent from '../abstract-smart-component';
import {createTripEventEditHeaderTemplate} from './event-edit/event__header';
import {createTripEventEditOffersTemplate} from './event-edit/event--offers';
import {createTripEventEditDestinationTemplate} from './event-edit/event--destination';

const createTripEventEditTemplate = (event) => {
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

export default class MainTripDayEventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._isType = event.type;
    this._isFavorite = event.isFavorite;

    this._subscribeOnEvents();
    this._buttonEventSaveHandler = null;
    this._buttonEventResetHandler = null;
    this._buttonEventCloseHandler = null;
    this._chooseTypeHandler = null;
    this._favoriteClickHandler = null;
  }

  setButtonEventSaveClick(handler) {
    this.getElement().querySelector(`.event--edit`)
      .addEventListener(`submit`, handler);

    this._buttonEventSaveHandler = handler;
  }

  setButtonEventResetClick(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._buttonEventResetHandler = handler;
  }

  setButtonEventCloseClick(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._buttonEventCloseHandler = handler;
  }

  setTypeClick(handler) {
    this.getElement().querySelector(`.event__type-list`)
      .addEventListener(`click`, handler);

    this._chooseTypeHandler = handler;
  }

  setFavoriteClick(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);

    this._favoriteClickHandler = handler;
  }

  recoveryListeners() {
    this.setButtonEventSaveClick(this._buttonEventSaveHandler);
    this.setButtonEventResetClick(this._buttonEventResetHandler);
    this.setButtonEventCloseClick(this._buttonEventCloseHandler);
    this.setTypeClick(this._chooseTypeHandler);
    this.setFavoriteClick(this._favoriteClickHandler);
    this._subscribeOnEvents();
  }

  rerenderElement() {
    super.rerenderElement();
  }

  reset() {
    const event = this._event;

    this._isType = event.type;
    this._isFavorite = event.isFavorite;

    this.rerenderElement();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, () => {
        this.rerenderElement();
      });
  }

  getTemplate() {
    return createTripEventEditTemplate(this._event);
  }
}
