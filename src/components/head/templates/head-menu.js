import {MenuItem} from '../menu';

const menuMarkup = (item) => {
  return (
    `<a id="menu-${item}" class="trip-tabs__btn ${item === MenuItem.TABLE ? `trip-tabs__btn--active` : ``}" href="#">${item}</a>`
  );
};

export const createHeadMenuTemplate = (menuItems) => {
  const items = Object.values(menuItems);
  const menusMarkup = items
    .map((item) => menuMarkup(item))
    .join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menusMarkup}
    </nav>`
  );
};
