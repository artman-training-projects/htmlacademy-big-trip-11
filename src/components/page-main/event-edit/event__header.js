import {tripPointTypesMap} from '../../../utils/const';
import {parseTime, parseDate} from '../../../utils/common';

import {tripDestinationCitys} from '../../../mock/trip-destination';

const createTripDestinationList = (destinationCitys) => {
  return destinationCitys
    .map((city) => `<option value="${city}"></option>`)
    .join(`\n`);
};

const createTripEventEditHeaderTemplate = (event, type, eventDestiantion) => {
  return (
    `<header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${event.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="${type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${event.id}" name="event-type-checked" value="${type}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${event.id}">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-${event.id}">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-${event.id}">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-${event.id}">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-${event.id}">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-${event.id}">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Flight">
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-${event.id}">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${event.id}">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${event.id}">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-${event.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${event.id}">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${event.id}">
          ${tripPointTypesMap.get(type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${event.id}" type="text" name="event-destination" value="${eventDestiantion.name ? eventDestiantion.name : ``}" list="destination-list-${event.id}">
        <datalist id="destination-list-${event.id}">
          ${createTripDestinationList(tripDestinationCitys)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${event.id}">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-${event.id}" type="text" name="event-start-time" value="${parseDate(event.dateFrom)} ${parseTime(event.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${event.id}">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-${event.id}" type="text" name="event-end-time" value="${parseDate(event.dateTo)} ${parseTime(event.dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${event.id}">
          <span class="visually-hidden">${event.basePrice}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${event.id}" type="text" name="event-price" value="${event.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${!eventDestiantion.name ? `disabled` : ``}>Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-${event.id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-${event.id}">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>`
  );
};

export {createTripEventEditHeaderTemplate};


/* <button class="event__save-btn  btn  btn--blue" type="submit" ${isBlockSaveButton ? `disabled` : ``}>Save</button> */
