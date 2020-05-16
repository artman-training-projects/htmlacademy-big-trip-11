import {createMainSortTemplate} from './templates/mainSortTemplate';
import AbstractComponent from '../abstract-component';

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export default class SortComponent extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.EVENT;
  }

  getTemplate() {
    return createMainSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  resetSortType() {
    this._currentSortType = SortType.EVENT;
  }

  setSortTypeSelectHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
