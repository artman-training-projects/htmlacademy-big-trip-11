import {monthMap} from '../../../helpers/const';
import {createElement} from '../../../helpers/utils';

export class MainTripDay {
  constructor(event, day) {
    this._day = day;
    this._dayFrom = event.dateFrom;
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
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._day}</span>
          <time class="day__date" datetime="${this._dayFrom}">${monthMap.get(this._dayFrom.getMonth())} ${this._dayFrom.getDate()}</time>
        </div>

        <ul class="trip-events__list">
        </ul>
      </li>`
    );
  }
}
