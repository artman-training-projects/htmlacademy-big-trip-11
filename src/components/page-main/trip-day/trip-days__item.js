import AbstractComponent from '../../abstract-component';
import {monthMap} from '../../../utils/const';

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

export default class MainTripDay extends AbstractComponent {
  constructor(day, event) {
    super();
    this._day = day;
    this._dateFrom = event.dateFrom;
  }

  getTemplate() {
    return tripDaysItemTemplate(this._day, this._dateFrom);
  }
}
