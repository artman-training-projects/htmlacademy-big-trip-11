import {tripPointTypesMap} from '../../../utils/const';
import {parseTime, parseDate} from '../../../utils/common';

let offerCount = 1;
const addOfferCount = () => offerCount++;

const createTripEventEditHeaderTemplate = (event) => {
  const count = addOfferCount();

  return (
    `<header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${count}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.toLowerCase()}.png" alt="${event.type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${count}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${count}">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-${count}">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-${count}">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-${count}">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-${count}">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-${count}">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-${count}">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${count}">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${count}">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-${count}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${count}">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${count}">
          ${tripPointTypesMap.get(event.type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${count}" type="text" name="event-destination" value="${event.destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Saint Petersburg"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${count}">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-${count}" type="text" name="event-start-time" value="${parseDate(event.dateFrom)} ${parseTime(event.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${count}">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-${count}" type="text" name="event-end-time" value="${parseDate(event.dateTo)} ${parseTime(event.dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${count}">
          <span class="visually-hidden">${event.basePrice}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${count}" type="text" name="event-price" value="${event.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-${count}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-${count}">
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
