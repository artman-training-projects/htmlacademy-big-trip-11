import {renderComponent, replaceComponent} from '../utils/element';
import {getFilteredEvents} from './helpers/get-filtered-events';

import FilterComponent from '../components/head/filter';

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._currentFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const allEvents = this._eventsModel.getAllEvents();
    const filters = Object.values(FilterType).map((filterType) => ({
      name: filterType,
      count: allEvents ? getFilteredEvents(allEvents, filterType).length : 0,
      checked: filterType === this._eventsModel.getFilterType(),
    }));

    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replaceComponent(this._filterComponent, oldComponent);
    } else {
      renderComponent(this._container, this._filterComponent);
    }
  }

  reset() {
    this._currentFilterType = FilterType.EVERYTHING;
    this._eventsModel.setFilterType(FilterType.EVERYTHING);
    this.render();
  }

  _onFilterChange(filterType) {
    this._eventsModel.setFilterType(filterType);
    this._currentFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
