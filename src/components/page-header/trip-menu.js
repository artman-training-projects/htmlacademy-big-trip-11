import AbstractComponent from '../abstract-component';

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

const MENU_ID_PREFIX = `menu-`;
const getMenuNameById = (id) => id.substring(MENU_ID_PREFIX.length);

const menuMarkup = (item) => {
  return (
    `<a id="menu-${item}" class="trip-tabs__btn ${item === MenuItem.TABLE ? `trip-tabs__btn--active` : ``}" href="#">${item}</a>`
  );
};

const tripControlsTemplate = (menuItems) => {
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

export default class HeaderTripMenu extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return tripControlsTemplate(MenuItem);
  }

  setActiveMenu(menuItem) {
    const activeItems = this.getElement().querySelector(`.trip-tabs__btn--active`);
    if (activeItems) {
      activeItems.classList.remove(`trip-tabs__btn--active`);
    }

    const item = this.getElement().querySelector(`#${MENU_ID_PREFIX + menuItem}`);
    item.classList.add(`trip-tabs__btn--active`);
  }

  setMenuChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const menuItem = getMenuNameById(evt.target.id);
      handler(menuItem);
    });
  }
}
