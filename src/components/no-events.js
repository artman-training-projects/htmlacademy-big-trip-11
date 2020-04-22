import {RenderPosition, renderComponent} from '../utils/element';

import AbstractComponent from '../components/abstract-component';
import MainEventNo from '../components/page-main/event-no';
import HeaderTripInfo from '../components/page-header/trip-info';
import HeaderTripMenu from '../components/page-header/trip-menu';
import HeaderTripFilter from '../components/page-header/trip-filter';

export default class NoEvents extends AbstractComponent {
  getTemplate() {
    const tripMain = document.querySelector(`.trip-main`);
    renderComponent(tripMain, new HeaderTripInfo(), RenderPosition.AFTERBEGIN);

    const tripControls = tripMain.querySelector(`.trip-controls`);
    renderComponent(tripControls, new HeaderTripMenu());
    renderComponent(tripControls, new HeaderTripFilter());

    const tripEvents = document.querySelector(`.trip-events`);
    renderComponent(tripEvents, new MainEventNo());
  }
}
