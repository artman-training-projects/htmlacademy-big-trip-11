import {HIDDEN_CLASS} from '../components/abstract-component';
import {RenderPosition, renderComponent, removeComponent} from '../utils/element';
import {SortType} from '../components/page-main/trip-sort';
import {getFilteredEvents} from './helpers/getFilteredEvents';
import {getSortedEvents} from './helpers/getSortedEvents';

import TripInfoComponent from '../components/page-header/trip-info';
import TripMenuComponent, {MenuItem} from '../components/page-header/trip-menu';
import EventSortComponent from '../components/page-main/trip-sort';

import TripDaysComponent from '../components/page-main/trip-days';
import TripDayComponent from '../components/page-main/trip-day/trip-days__item';

import EventNoComponent from '../components/page-main/event-edit/event-no';
import StatisticsComponent from '../components/statistics';

import FilterController, {FilterType} from './filterController';
import EventController, {Mode as EventControllerMode, EmptyEvent} from './eventController';

export default class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._showedEventsComponents = [];

    this._noEventsComponent = new EventNoComponent();
    this._eventSortComponent = new EventSortComponent();
    this._tripDaysComponent = new TripDaysComponent();
    this._tripMenuComponent = null;
    this._statisticsComponent = null;
    this._filterController = null;

    this._creatingEvent = null;
    this._activeSortType = SortType.EVENT;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._eventSortComponent.setSortTypeSelectHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterTypeChange);
  }

  init(entryPoints) {
    const events = getSortedEvents(this._eventsModel.getAllEvents(), this._activeSortType);
    const {MAIN, CONTROLS} = entryPoints;
    renderComponent(MAIN, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

    this._tripMenuComponent = new TripMenuComponent();
    renderComponent(CONTROLS, this._tripMenuComponent);

    this._filterController = new FilterController(CONTROLS, this._eventsModel);
    this._filterController.render();

    // this._statisticsComponent = new StatisticsComponent(this._eventsModel);
    // renderComponent(this._container, this._statisticsComponent);
    // this._statisticsComponent.hide();

    this.render(events);

    this._tripMenuComponent.setMenuChange((menuItem) => {
      switch (menuItem) {
        case MenuItem.TABLE:
          this._tripMenuComponent.setActiveMenu(MenuItem.TABLE);
          // this._statisticsComponent.hide();
          this.show();
          break;
        case MenuItem.STATS:
          this._tripMenuComponent.setActiveMenu(MenuItem.STATS);
          this.hide();
          // this._statisticsComponent.show();
          break;
      }
    });

    const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
    newEventButton.addEventListener(`click`, () => this.createEvent());
  }

  render(events) {
    if (!events) {
      renderComponent(this._container, this._noEventsComponent);
      return;
    }

    renderComponent(this._container, this._eventSortComponent);
    renderComponent(this._container, this._tripDaysComponent);
    this._renderEvents(events);
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }
    this._activeSortType = SortType.EVENT;
    this._eventsModel.setFilterType(FilterType.EVERYTHING);
    const events = getSortedEvents(this._eventsModel.getAllEvents(), this._activeSortType);

    const eventListElement = this._tripDaysComponent.getElement();
    this._creatingEvent = new EventController(eventListElement, this._onDataChange, this._onViewChange);
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADD);
    console.log(this._creatingEvent);
    // this._creatingEvent.destroy();
    // console.log(this._creatingEvent);
    this._onViewChange();
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  _renderEvents(events) {
    const container = this._tripDaysComponent.getElement();
    const newTrip = this._renderTrip(container, events);
    this._showedEventsComponents = newTrip;
  }

  _updateEvents(events) {
    this._removeEvents();
    this._renderEvents(events);
  }

  _removeEvents() {
    this._showedEventsComponents.forEach((eventComponent) => eventComponent.destroy());
    this._tripDaysComponent.getElement().innerHTML = ``;
    this._showedEventsComponents = [];
  }

  _onNewEvent() {
    //
  }

  _onDataChange(eventController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        eventController.destroy();
        this._updateEvents(this._showedEventsComponents);
      } else {
        this._eventsModel.addEvent(newData);
        eventController.render(newData, EventControllerMode.DEFAULT);

        this._showedEventsComponents = [].concat(eventController, this._showedEventsComponents);
      }
    } else if (newData === null) {
      this._eventsModel.removeEvent(oldData.id);
      eventController.destroy();
    } else {
      const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);
      if (isSuccess) {
        eventController.render(newData, EventControllerMode.DEFAULT);
      }
    }
  }

  _onFilterTypeChange() {
    this._activeSortType = SortType.EVENT;
    const events = getSortedEvents(this._eventsModel.getAllEvents(), this._activeSortType);
    const filteredEvents = getFilteredEvents(events, this._eventsModel.getFilterType());
    this._updateEvents(filteredEvents);
  }

  _onSortTypeChange(sortType) {
    this._activeSortType = sortType;
    const sortedEvents = getSortedEvents(this._eventsModel.getAllEvents(), sortType);
    this._updateEvents(sortedEvents);
  }

  _onViewChange() {
    this._showedEventsComponents.forEach((event) => event.setDefaultView());
  }

  _renderTrip(container, trip) {
    let dayFrom;
    let daysCount = 0;
    let tripDay;
    let dayTrip;

    return trip.map((event) => {
      if (this._activeSortType !== SortType.EVENT) {
        dayTrip = new TripDayComponent();
      }

      if (dayFrom !== event.dateFrom.getDate()) {
        dayFrom = event.dateFrom.getDate();
        daysCount++;
        dayFrom = event.dateFrom.getDate();

        if (this._activeSortType === SortType.EVENT) {
          dayTrip = new TripDayComponent(daysCount, event.dateFrom);
        }

        tripDay = dayTrip.getElement().querySelector(`.trip-events__list`);
        renderComponent(container, dayTrip);
      }

      const eventController = new EventController(tripDay, this._onDataChange, this._onViewChange);
      eventController.render(event, EventControllerMode.DEFAULT);
      return eventController;
    });
  }
}
