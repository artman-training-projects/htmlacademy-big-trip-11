import {RenderPosition, renderComponent} from '../utils/element';

import TripInfoComponent from '../components/page-header/trip-info';
import TripMenuComponent from '../components/page-header/trip-menu';
import TripFilterComponent from '../components/page-header/trip-filter';

import EventNoComponent from '../components/page-main/event-edit/event-no';
import EventSortComponent from '../components/page-main/trip-sort';
import TripDaysComponent from '../components/page-main/trip-days';

import SortController from './sortController';

export default class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._showedEventsComponents = [];

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

  init(entryPoints) {
    const events = this._eventsModel.getEvents();
    const {MAIN, CONTROLS} = entryPoints;
    renderComponent(MAIN, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);
    renderComponent(CONTROLS, new TripMenuComponent());
    renderComponent(CONTROLS, new TripFilterComponent());
    this._sortController = new SortController(this._tripDaysContainer, events, this._onDataChange, this._onViewChange);

    if (events.length < 1) {
      renderComponent(this._container, this._noEventsComponent);
    } else {
      this.render();
    }

  }

  render() {
    renderComponent(this._container, this._eventSortComponent);
    renderComponent(this._container, this._tripDaysComponent);

    const newTrip = this._sortController.renderSortedEvents();
    this._showedEventsComponents = newTrip;
  }

  _onDataChange(eventController, oldData, newData) {
    const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

    if (isSuccess) {
      eventController.render(newData);
    }
  }

  _onSortTypeChange(sortType) {
    this._tripDaysContainer.innerHTML = ``;
    const newTrip = this._sortController.renderSortedEvents(sortType);
    this._showedEventsComponents = newTrip;
  }

  _onViewChange() {
    this._showedEventsComponents.forEach((event) => event.setDefaultView());
  }
}
