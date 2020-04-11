import {tripPointTypesMap} from '../../../const';
import {parseTime, getDiffTime} from '../../../utils';

const createTripEventsItemTemplate = (point) => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="${point.type} icon">
        </div>
        <h3 class="event__title">${tripPointTypesMap.get(point.type)} ${point.destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${point.dateFrom}">${parseTime(point.dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${point.dateTo}">${parseTime(point.dateTo)}</time>
          </p>
          <p class="event__duration">${getDiffTime(point.dateFrom, point.dateTo)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Add luggage</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">50</span>
          </li>
          <li class="event__offer">
            <span class="event__offer-title">Switch to comfort</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">80</span>
            </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export {createTripEventsItemTemplate};
