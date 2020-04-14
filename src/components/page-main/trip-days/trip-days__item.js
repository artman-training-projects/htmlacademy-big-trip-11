import {createTripDayInfoTemplate} from './day__info';

const createTripDayTemplate = (point, count) => {
  return (
    `<li class="trip-days__item  day">
      ${createTripDayInfoTemplate(point, count)}
    </li>`
  );
};

export {createTripDayTemplate};
