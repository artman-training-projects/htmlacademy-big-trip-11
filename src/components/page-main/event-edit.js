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
    this._isFavorite = event.isFavorite;

    this._subscribeOnEvents();
  }

  setButtonEventSaveClick(handler) {
    this.getElement().querySelector(`.event__save-btn`)
      .addEventListener(`click`, handler);
  }

  setButtonEventResetClick(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);
  }

  setButtonEventCloseClick(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerenderElement() {
    super.rerenderElement();
  }

  reset() {
    const event = this._event;

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
