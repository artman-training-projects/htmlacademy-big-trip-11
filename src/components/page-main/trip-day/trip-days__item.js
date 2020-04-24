import AbstractComponent from '../../abstract-component';
import {monthMap} from '../../../utils/const';

const tripDaysItemTemplate = (day, dateFrom) => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${day ? day : ``}</span>
          <time class="day__date" datetime="${dateFrom ? dateFrom : ``}">${dateFrom ? monthMap.get(dateFrom.getMonth()) : ``} ${dateFrom ? dateFrom.getDate() : ``}</time>
        </div>

        <ul class="trip-events__list">
        </ul>
      </li>`
  );
};

export default class MainTripDay extends AbstractComponent {
  constructor(day, dateFrom) {
    super();
    this._day = day;
    this._dateFrom = dateFrom;
  }

  getTemplate() {
    return tripDaysItemTemplate(this._day, this._dateFrom);
  }
}
