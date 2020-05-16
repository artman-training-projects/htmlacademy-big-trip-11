import {createMainNoEventsTemplate} from './templates/main-no-event';
import AbstractComponent from '../abstract-component';

export default class NoEventComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMainNoEventsTemplate();
  }
}
