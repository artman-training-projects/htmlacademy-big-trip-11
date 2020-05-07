import {DESTINATION_CITY, TRANSFER_TYPE, ACTIVITY_TYPE, tripPointTypesMap} from '../../../utils/const';
import {parseTime, parseDate} from '../../../utils/common';

const createTripDestinationList = (destinationCitys) => {
  return destinationCitys
    .map((city) => `<option value="${city}"></option>`)
    .join(`\n`);
};

const createTripTypeTransferList = (transferList, currentType, id) => {
  let template = ``;
  for (const type of transferList) {
    const isChecked = (type === currentType) ? `checked` : ``;

    template +=
      `<div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${type}</label>
      </div>`;
  }

  return template;
};

const createTripTypeActivityList = (activityList, currentType, id) => {
  let template = ``;
  for (const type of activityList) {
    const isChecked = (type === currentType) ? `checked` : ``;

    template +=
      `<div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${type}</label>
      </div>`;
  }

  return template;
};

const createTripEventEditHeaderTemplate = (event, type, eventDestiantion, eventPrice) => {
  const isPrice = !!eventPrice;

  console.log(event.type + ` ` + type);

  return (
    `<header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${event.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="${type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${event.id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${createTripTypeTransferList(TRANSFER_TYPE, event.type, event.id)}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${createTripTypeActivityList(ACTIVITY_TYPE, event.type, event.id)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${event.id}">
          ${tripPointTypesMap.get(type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${event.id}" type="text" name="event-destination" value="${eventDestiantion.name ? eventDestiantion.name : ``}" list="destination-list-${event.id}">
        <datalist id="destination-list-${event.id}">
          ${createTripDestinationList(DESTINATION_CITY)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${event.id}">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-${event.id}" type="text" name="event-start-time" value="${(event.dateFrom)} ${(event.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${event.id}">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-${event.id}" type="text" name="event-end-time" value="${(event.dateTo)} ${(event.dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${event.id}">
          <span class="visually-hidden">${isPrice ? eventPrice : ``}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${event.id}" type="text" name="event-price" value="${isPrice ? eventPrice : ``}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${!isPrice ? `disabled` : ``}>Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-${event.id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.is_favorite ? `checked` : ``}>
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
