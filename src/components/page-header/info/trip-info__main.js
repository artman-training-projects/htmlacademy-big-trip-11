import {getRoute, getRouteDates} from '../../../helpers/utils';

const createTripInfoMainTemplate = (events) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getRoute(events)}</h1>

      <p class="trip-info__dates">${getRouteDates(events)}</p>
    </div>`
  );
};

export {createTripInfoMainTemplate};
