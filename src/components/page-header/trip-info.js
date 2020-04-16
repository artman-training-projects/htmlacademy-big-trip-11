import {calcFullPrice, getRoute, getRouteDates, createElement} from '../../helpers/utils';

export class HeaderTripInfo {
  constructor(trip) {
    this._route = getRoute(trip);
    this._dates = getRouteDates(trip);
    this._fullPrice = calcFullPrice(trip);

    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${this._route}</h1>

          <p class="trip-info__dates">${this._dates}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._fullPrice}</span>
        </p>
      </section>`
    );
  }
}
