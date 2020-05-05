import {renderComponent, replaceComponent} from '../utils/element';

import FilterComponent from '../components/page-header/trip-filter';

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    // const allEvents = this._eventsModel.getAllEvents();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        // count: getEventsByFilter(allEvents, filterType).length,
        checked: filterType === this._eventsModel.getFilterType(),
      };
    });

    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replaceComponent(this._filterComponent, oldComponent);
    } else {
      renderComponent(this._container, this._filterComponent);
    }
  }

  _onFilterChange(filterType) {
    this._eventsModel.setFilterType(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
