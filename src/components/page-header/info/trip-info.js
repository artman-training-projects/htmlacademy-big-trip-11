import {createTripInfoMainTemplate} from './trip-info__main';
import {createTripInfoCostTemplate} from './trip-info__cost';

const createTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${createTripInfoMainTemplate()}

      ${createTripInfoCostTemplate()}
    </section>`
  );
};

export {createTripInfoTemplate};
