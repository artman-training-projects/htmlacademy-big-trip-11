import AbstractComponent from '../abstract-component';
import {calcFullPrice, getRoute, getRouteDates} from '../../utils/utils';


const tripMainInfoTemplate = (route, dates, fullPrice) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${dates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullPrice}</span>
      </p>
    </section>`
  );
};

export default class HeaderTripInfo extends AbstractComponent {
  constructor(trip) {
    super();
    this._route = trip ? getRoute(trip) : ``;
    this._dates = trip ? getRouteDates(trip) : ``;
    this._fullPrice = trip ? calcFullPrice(trip) : 0;
  }

  getTemplate() {
    return tripMainInfoTemplate(this._route, this._dates, this._fullPrice);
  }
}
