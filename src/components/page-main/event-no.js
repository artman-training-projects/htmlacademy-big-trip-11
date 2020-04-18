import {createElement} from '../../utils/element';

const createEventNoTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class MainEventNo {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return createEventNoTemplate();
  }
}
