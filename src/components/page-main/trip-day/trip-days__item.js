import {monthMap} from '../../../helpers/const';
import {createElement} from '../../../helpers/components';

const tripDaysItemTemplate = (day, dateFrom) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="${dateFrom}">${monthMap.get(dateFrom.getMonth())} ${dateFrom.getDate()}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export class MainTripDay {
  constructor(day, event) {
    this._day = day;
    this._dateFrom = event.dateFrom;
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
    return tripDaysItemTemplate(this._day, this._dateFrom);
  }
}
