import AbstractComponent from '../abstract-component';

const FILTER_ID_PREFIX = `filter-`;
const getFilterNameById = (id) => id.substring(FILTER_ID_PREFIX.length);

const filterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``} ${!count ? `disabled` : ``}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
  );
};

const tripEventsFilterTemplate = (filters) => {
  const filtersMarkup = filters
    .map((filter) => filterMarkup(filter, filter.checked))
    .join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class HeaderTripFilter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return tripEventsFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
