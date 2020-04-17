import {createElement} from '../../helpers/components';

const tripDaysTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export class MainTripDays {
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
    return tripDaysTemplate();
  }
}
