import AbstractComponent from '../abstract-component';
import {createTripEventEditHeaderTemplate} from './event-edit/event__header';
import {createTripEventEditOffersTemplate} from './event-edit/event--offers';
import {createTripEventEditDestinationTemplate} from './event-edit/event--destination';

const createTripEventEditTemplate = (event, isFavorite) => {
  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        ${createTripEventEditHeaderTemplate(event, isFavorite)}

        <section class="event__details">
          ${createTripEventEditOffersTemplate(event.offers)}

          ${createTripEventEditDestinationTemplate(event.destination)}
        </section>
      </form>
    </li>`
  );
};

export default class MainTripDayEventEdit extends AbstractComponent {
  constructor(event) {
    super();
    this._isFavorite = false;
    this._event = event;
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

  getTemplate() {
    return createTripEventEditTemplate(this._event, this._isFavorite);
  }
}
