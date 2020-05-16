import {createLoadingEventsTemplate} from './templates/main-loading';
import AbstractComponent from '../abstract-component';

export default class Loading extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingEventsTemplate();
  }
}
