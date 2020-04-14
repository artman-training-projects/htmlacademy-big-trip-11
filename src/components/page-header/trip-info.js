import {createTripInfoMainTemplate} from './info/trip-info__main';
import {createTripInfoCostTemplate} from './info/trip-info__cost';

const createTripInfoTemplate = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${createTripInfoMainTemplate(events)}

      ${createTripInfoCostTemplate(events)}
    </section>`
  );
};

export {createTripInfoTemplate};
