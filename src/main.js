import API from './api/api';
import Store from './api/store';
import Provider from './api/provider';
import {renderComponent, removeComponent, RenderPosition} from './utils/element';

import HeadInfoComponent from './components/head/info';
import HeadMenuComponent, {MenuItem} from './components/head/menu';
import StatisticsComponent from './components/statistics';
import LoadingComponent from './components/main/loading';

import EventsModel from './models/events';
import TripController from './controllers/trip-controller';
import FilterController from './controllers/filter-controller';

const AUTHORIZATION = `Basic 3fc28b89c9a044a0edf0b1602d4f9`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip/`;

const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const ENTRY_POINT = {
  MAIN: document.querySelector(`.trip-main`),
  CONTROLS: document.querySelector(`.trip-controls`),
  EVENTS: document.querySelector(`.trip-events`),
};

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const eventsModel = new EventsModel();

const headInfoComponent = new HeadInfoComponent(eventsModel);
const headMenuComponent = new HeadMenuComponent();
const loadingComponent = new LoadingComponent();
const filterController = new FilterController(ENTRY_POINT.CONTROLS, eventsModel);
const tripController = new TripController(ENTRY_POINT.EVENTS, eventsModel, apiWithProvider);

renderComponent(ENTRY_POINT.EVENTS, loadingComponent);
apiWithProvider.getData()
  .then((data) => {
    eventsModel.setEvents(data.events);
    eventsModel.setOffersByType(data.offers);
    eventsModel.setDestinations(data.destinations);
    removeComponent(loadingComponent);
    renderComponent(ENTRY_POINT.MAIN, headInfoComponent, RenderPosition.AFTERBEGIN);
    renderComponent(ENTRY_POINT.CONTROLS, headMenuComponent, RenderPosition.AFTERBEGIN);
    filterController.render();
    tripController.render();
  });

eventsModel.setDataChangeHandler(() => {
  removeComponent(headInfoComponent);
  renderComponent(ENTRY_POINT.MAIN, headInfoComponent, RenderPosition.AFTERBEGIN);
});

const statisticsComponent = new StatisticsComponent(eventsModel);
renderComponent(ENTRY_POINT.EVENTS, statisticsComponent, RenderPosition.AFTEREND);
statisticsComponent.hide();

headMenuComponent.setOnChangeItemClick((menuItem) => {
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
  statisticsComponent.hide();
  tripController.show();
  tripController.createEvent();
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
