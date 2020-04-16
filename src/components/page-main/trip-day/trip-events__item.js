import {tripPointTypesMap, SHOW_OFFERS} from '../../../helpers/const';
import {parseTime, getDiffTime} from '../../../helpers/utils';
import {createElement} from '../../../helpers/utils';

const createTripEventOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const createTripEventOffersTemplate = (offers) => {
  return offers ? offers
    .slice(0, SHOW_OFFERS)
    .map((offer) => createTripEventOfferTemplate(offer))
    .join(``) : ``;
};

export class MainTripDayEvent {
  constructor(event) {
    this._eventType = event.type;
    this._destination = event.destination.name;
    this._offers = event.offers;
    this._dateFrom = event.dateFrom;
    this._dateTo = event.dateTo;
    this._basePrice = event.basePrice;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._eventType.toLowerCase()}.png" alt="${this._eventType} icon">
          </div>
          <h3 class="event__title">${tripPointTypesMap.get(this._eventType)} ${this._destination}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${this._dateFrom}">${parseTime(this._dateFrom)}</time>
              &mdash;
              <time class="event__end-time" datetime="${this._dateTo}">${parseTime(this._dateTo)}</time>
            </p>
            <p class="event__duration">${getDiffTime(this._dateFrom, this._dateTo)}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._basePrice}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${createTripEventOffersTemplate(this._offers)}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }
}
