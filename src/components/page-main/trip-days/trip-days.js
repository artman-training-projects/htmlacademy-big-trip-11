import {createTripDayInfoTemplate} from './day__info';
import {createTripEventsItemTemplate} from './trip-events__item';

const createTripEventsItemsTemplate = (events) => {
  let templateItems = new Array(...events)
    .map((event) => createTripEventsItemTemplate(event));

  return templateItems.join(``);
};

const createTripDaysTemplate = (tripsPoint) => {
  console.log(JSON.stringify(tripsPoint[0], null, 2));

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        ${createTripDayInfoTemplate()}

        <ul class="trip-events__list">
          ${createTripEventsItemsTemplate(tripsPoint)}
        </ul>
      </li>
    </ul>`
  );
};

export {createTripDaysTemplate};
