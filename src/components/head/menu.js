import {createHeadMenuTemplate} from './templates/head-menu';
import AbstractComponent from '../abstract-component';

const NEW_EVENT_BTN = `trip-main__event-add-btn`;
const MENU_ID_PREFIX = `menu-`;
const getMenuNameById = (id) => id.substring(MENU_ID_PREFIX.length);

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export default class Menu extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createHeadMenuTemplate(MenuItem);
  }

  setNewEventButtonClick(handler) {
    document.querySelector(`.${NEW_EVENT_BTN}`).addEventListener(`click`, handler);
  }

  setActiveItem(menuItem) {
    const activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
    if (activeItem) {
      activeItem.classList.remove(`trip-tabs__btn--active`);
    }

    const item = this.getElement().querySelector(`#${MENU_ID_PREFIX + menuItem}`);
    item.classList.add(`trip-tabs__btn--active`);
  }

  setOnChangeItemClick(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const menuItem = getMenuNameById(evt.target.id);
      handler(menuItem);
    });
  }
}
