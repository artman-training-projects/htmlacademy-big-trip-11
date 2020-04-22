import AbstractComponent from '../abstract-component';
import {createTripEventEditHeaderTemplate} from './event-edit/event__header';
import {createTripEventEditOffersTemplate} from './event-edit/event--offers';
import {createTripEventEditDestinationTemplate} from './event-edit/event--destination';

const createTripEventEditTemplate = (event) => {
  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        ${createTripEventEditHeaderTemplate(event)}

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

  getTemplate() {
    return createTripEventEditTemplate(this._event);
  }
}
