import AbstractComponent from '../abstract-component';

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

const tripEventsSortTemplate = () => {
  const sortTypes = Object.values(SortType);
  const sortMarkups = sortTypes
    .map((sort) => sortMarkup(sort))
    .join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${sortMarkups}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

const sortMarkup = (sort) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${sort === SortType.EVENT ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${sort}" data-sort-type="${sort}">
        ${sort}
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>`
  );
};

export default class MainEventsSort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.EVENT;
  }

  getTemplate() {
    return tripEventsSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
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
