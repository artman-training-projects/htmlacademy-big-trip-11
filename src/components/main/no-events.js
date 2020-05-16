import {createMainNoEventsTemplate} from './templates/main-no-event';
import AbstractComponent from '../abstract-component';

export default class NoEvent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMainNoEventsTemplate();
  }
}
