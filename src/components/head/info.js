import {createHeadInfoTemplate} from './templates/headInfoTemplate';
import AbstractComponent from '../abstract-component';

export default class InfoComponent extends AbstractComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;
  }

  getTemplate() {
    return createHeadInfoTemplate(this._eventsModel.getAllEvents());
  }
}
