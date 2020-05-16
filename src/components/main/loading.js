import {createLoadingEventsTemplate} from './templates/main-loading';
import AbstractComponent from '../abstract-component';

export default class LoadingComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingEventsTemplate();
  }
}
