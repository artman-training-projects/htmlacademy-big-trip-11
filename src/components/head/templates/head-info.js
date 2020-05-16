import {getFullCost, getRoute, getRouteDates} from '../../../utils/common';

export const createHeadInfoTemplate = (events) => {
  const route = (events.length > 0) ? getRoute(events) : ``;
  const dates = (events.length > 0) ? getRouteDates(events) : ``;
  const cost = (events.length > 0) ? getFullCost(events, `basePrice`) : 0;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${dates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};
