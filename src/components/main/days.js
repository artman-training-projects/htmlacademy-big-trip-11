import {createMainDaysTemplate} from './templates/main-days';
import AbstractComponent from '../abstract-component';

export default class Days extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMainDaysTemplate();
  }
}
