import AbstractComponent from '../abstract-component';

const tripDaysTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class MainTripDays extends AbstractComponent {
  getTemplate() {
    return tripDaysTemplate();
  }
}
