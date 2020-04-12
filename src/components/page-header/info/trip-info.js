import {createTripInfoMainTemplate} from './trip-info__main';
import {createTripInfoCostTemplate} from './trip-info__cost';

const createTripInfoTemplate = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${createTripInfoMainTemplate(events)}

      ${createTripInfoCostTemplate(events)}
    </section>`
  );
};

export {createTripInfoTemplate};
