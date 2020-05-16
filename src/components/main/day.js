import {createMainDayTemplate} from './templates/main-day';
import AbstractComponent from '../abstract-component';

export default class DayComponent extends AbstractComponent {
  constructor(event, number) {
    super();
    this._dayNumber = number ? number : ``;
    this._dayFrom = event ? event.dateFrom : ``;
  }

  getTemplate() {
    return createMainDayTemplate(this._dayFrom, this._dayNumber);
  }
}
