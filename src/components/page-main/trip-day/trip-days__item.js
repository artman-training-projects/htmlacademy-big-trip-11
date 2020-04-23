import AbstractComponent from '../../abstract-component';
import {monthMap} from '../../../utils/const';

const tripDaysItemTemplate = (day = ``, dateFrom = ``) => {
  let template = ``;

  if (dateFrom) {
    template += `<li class="trip-days__item  day">
                  <div class="day__info">
                    <span class="day__counter">${day}</span>
                    <time class="day__date" datetime="${dateFrom}">${monthMap.get(dateFrom.getMonth())} ${dateFrom.getDate()}</time>
                  </div>

                  <ul class="trip-events__list">
                  </ul>
                </li>`;
  } else {
    template += `<li class="trip-days__item  day">
                  <div class="day__info">
                    <span class="day__counter"></span>
                    <time class="day__date" datetime=""></time>
                  </div>

                  <ul class="trip-events__list">
                  </ul>
                </li>`;
  }

  return template;
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
