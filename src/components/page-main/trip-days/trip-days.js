import {createTripDayInfoTemplate} from './day__info';
import {createTripEventsItemTemplate} from './trip-events__item';

const ROUTE_POINT = 3;
const createTripEventsItemsTemplate = (points) => {
  let templateItems = [];

  for (let i = 0; i < points; i++) {
    templateItems.push(createTripEventsItemTemplate());
  }

  return templateItems.join(``);
};

const createTripDaysTemplate = (trips) => {
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        ${createTripDayInfoTemplate()}

        <ul class="trip-events__list">
          ${createTripEventsItemsTemplate(ROUTE_POINT)}
        </ul>
      </li>
    </ul>`
  );
};

export {createTripDaysTemplate};
