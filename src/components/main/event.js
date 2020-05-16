import {createMainDayEventItemTemplate} from './templates/main-day-event';
import AbstractComponent from '../abstract-component';

export default class Event extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createMainDayEventItemTemplate(this._event);
  }

  setOpenEditHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
