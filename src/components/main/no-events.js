import {createMainNoEventsTemplate} from './templates/mainNoEventsTemplate';
import AbstractComponent from '../abstract-component';

export default class NoEventComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMainNoEventsTemplate();
  }
}
