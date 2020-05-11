import {createMainDaysTemplate} from './templates/mainDaysTemplate';
import AbstractComponent from '../abstract-component';

export default class DaysComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMainDaysTemplate();
  }
}
