import {RenderPosition, renderComponent} from '../utils/element';

import TripInfoComponent from '../components/page-header/trip-info';
import TripMenuComponent from '../components/page-header/trip-menu';
import TripFilterComponent from '../components/page-header/trip-filter';

import EventNoComponent from '../components/page-main/event-edit/event-no';
import EventSortComponent from '../components/page-main/trip-sort';
import TripDaysComponent from '../components/page-main/trip-days';

import SortController from './sortController';

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._showedEvents = [];

    this._noEventsComponent = new EventNoComponent();
    this._eventSortComponent = new EventSortComponent();
    this._tripDaysComponent = new TripDaysComponent();
    this._tripDaysContainer = this._tripDaysComponent.getElement();
    this._sortController = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._eventSortComponent.setSortTypeSelectHandler(this._onSortTypeChange);
  }

  init(entryPoints, trip) {
    this._events = trip;
    const {MAIN, CONTROLS} = entryPoints;
    renderComponent(MAIN, new TripInfoComponent(this._events), RenderPosition.AFTERBEGIN);
    renderComponent(CONTROLS, new TripMenuComponent());
    renderComponent(CONTROLS, new TripFilterComponent());
  }

  render() {
    if (!this._events) {
      renderComponent(this._container, this._noEventsComponent);
      return;
    }

    renderComponent(this._container, this._eventSortComponent);
    renderComponent(this._container, this._tripDaysComponent);

    this._sortController = new SortController(this._tripDaysContainer, this._events, this._onDataChange, this._onViewChange);
    const newTrip = this._sortController.renderSortedEvents();
    this._showedEvents = newTrip;
  }

  _onDataChange(eventController, oldData, newData) {
    const index = this._events.findIndex((event) => event === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));
    eventController.render(this._events[index]);
  }

  _onSortTypeChange(sortType) {
    this._tripDaysContainer.innerHTML = ``;
    const newTrip = this._sortController.renderSortedEvents(sortType);
    this._showedEvents = newTrip;
  }

  _onViewChange() {
    this._showedEvents.forEach((event) => event.setDefaultView());
  }
}
