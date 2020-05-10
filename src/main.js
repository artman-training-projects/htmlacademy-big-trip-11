import API from './api';
import {renderComponent, removeComponent, RenderPosition} from './utils/element';

import HeadInfoComponent from './components/head/head-info';
import HeadMenuComponent, {MenuItem} from './components/head/head-menu';
import StatisticsComponent from './components/statistics';

import EventsModel from './models/events';
import TripController from './controllers/tripController';
import FilterController from './controllers/filterController';

const AUTHORIZATION = `Basic 3fc28b89c9a044aa0ceedf0b1602d4f9`;

const ENTRY_POINT = {
  MAIN: document.querySelector(`.trip-main`),
  CONTROLS: document.querySelector(`.trip-controls`),
  EVENTS: document.querySelector(`.trip-events`),
};

const api = new API(AUTHORIZATION);
const eventsModel = new EventsModel();

const headInfoComponent = new HeadInfoComponent(eventsModel);
const headMenuComponent = new HeadMenuComponent();

renderComponent(ENTRY_POINT.MAIN, headInfoComponent, RenderPosition.AFTERBEGIN);
renderComponent(ENTRY_POINT.CONTROLS, headMenuComponent);

const filterController = new FilterController(ENTRY_POINT.CONTROLS, eventsModel);
filterController.render();

const tripController = new TripController(ENTRY_POINT.EVENTS, eventsModel);
api.getEvents()
  .then((events) => {
    eventsModel.setEvents(events);
    tripController.render();
  });

eventsModel.setDataChangeHandler(() => {
  removeComponent(headInfoComponent);
  renderComponent(ENTRY_POINT.MAIN, headInfoComponent, RenderPosition.AFTERBEGIN);
});

const statisticsComponent = new StatisticsComponent(eventsModel);
renderComponent(ENTRY_POINT.EVENTS, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

headMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE: {
      headMenuComponent.setActiveItem(MenuItem.TABLE);
      statisticsComponent.hide();
      tripController.show();
      break;
    }
    case MenuItem.STATS: {
      headMenuComponent.setActiveItem(MenuItem.STATS);
      tripController.hide();
      statisticsComponent.show();
      break;
    }
  }
});

headMenuComponent.setNewEventButtonClick(() => {
  filterController.reset();
  tripController.createEvent();
});
