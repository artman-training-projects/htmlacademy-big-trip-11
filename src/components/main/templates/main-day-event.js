import {tripPointTypesMap} from '../../../utils/const';
import {parseTime, getDiffTime} from '../../../utils/common';

const SHOW_OFFERS = 3;

const createTripEventOffersTemplate = (offers) => {
  return offers ? offers
    .slice(0, SHOW_OFFERS)
    .map((offer) => createTripEventOfferTemplate(offer))
    .join(``) : ``;
};

const createTripEventOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

export const createMainDayEventItemTemplate = (event) => {

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.toLowerCase()}.png" alt="${event.type} icon">
        </div>
        <h3 class="event__title">${tripPointTypesMap.get(event.type)} ${event.destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${event.dateFrom}">${parseTime(event.dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${event.dateTo}">${parseTime(event.dateTo)}</time>
          </p>
          <p class="event__duration">${getDiffTime(new Date(event.dateFrom), new Date(event.dateTo))}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createTripEventOffersTemplate(event.offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
