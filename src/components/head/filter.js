import {createHeadFilterTemplate} from './templates/headFilterTemplate';
import AbstractComponent from '../abstract-component';

const FILTER_ID_PREFIX = `filter-`;
const getFilterNameById = (id) => id.substring(FILTER_ID_PREFIX.length);

export default class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createHeadFilterTemplate(this._filters);
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
