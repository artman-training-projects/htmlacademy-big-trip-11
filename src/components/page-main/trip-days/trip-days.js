import {createTripDayInfoTemplate} from './day__info';
import {createTripEventsItemTemplate} from './trip-events__item';

const createTripEventsItemsTemplate = (events) => {
  return events
    .slice()
    .map((event) => createTripEventsItemTemplate(event))
    .join(``);
};

const createTripDaysTemplate = (tripsPoint) => {
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        ${createTripDayInfoTemplate(tripsPoint)}

        <ul class="trip-events__list">
          ${createTripEventsItemsTemplate(tripsPoint)}
        </ul>
      </li>
    </ul>`
  );
};

export {createTripDaysTemplate};
