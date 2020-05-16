import {SortType} from '../sort';

export const createMainSortTemplate = (currentSortType) => {
  const sortTypes = Object.values(SortType);
  const sortMarkups = sortTypes
    .map((sort) => sortMarkup(sort, currentSortType))
    .join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">${currentSortType === SortType.EVENT ? `Day` : ``}</span>
      ${sortMarkups}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

const sortMarkup = (sort, current) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${sort === current ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${sort}" data-sort-type="${sort}">
        ${sort}
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>`
  );
};
