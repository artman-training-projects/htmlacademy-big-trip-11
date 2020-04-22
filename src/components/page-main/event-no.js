import AbstractComponent from '../abstract-component';

const createEventNoTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class MainEventNo extends AbstractComponent {
  getTemplate() {
    return createEventNoTemplate();
  }
}
