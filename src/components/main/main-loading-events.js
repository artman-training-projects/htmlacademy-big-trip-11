import {createLoadingEventsTemplate} from './templates/mainLoadingEventsTemplate';
import AbstractComponent from '../abstract-component';

export default class LoadingComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingEventsTemplate();
  }
}
