import {calcFullPrice} from '../../../utils';

const createTripInfoCostTemplate = (events) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calcFullPrice(events)}</span>
    </p>`
  );
};

export {createTripInfoCostTemplate};
