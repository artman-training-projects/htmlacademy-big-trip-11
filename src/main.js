import {createRouteTemplate} from './components/route';
import {createRouteInfoTemplate} from './components/route-info';
import {createRouteCostTemplate} from './components/route-cost';
import {createTripControlsTemplate} from './components/trip-controls';
import {createTripControlsFilterTemplate} from './components/trip-controls-filter';
import {createTripEventsSortTemplate} from './components/trip-events-sort';
import {createTripEditTemplate} from './components/trip-edit';
import {createTripOffersTemplate} from './components/trip-offers';
import {createTripOffersPointsTemplate} from './components/trip-offers-points';

import {generateTripPoint} from './mock/trip-point';

// времянка для логов
console.log(generateTripPoint());

const ROUTE_POINT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderRoutePoints = (container, template, place, routeCount) => {
  for (const route of container) {
    for (let i = 0; i < routeCount; i++) {
      render(route, template, place);
    }
  }
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createRouteTemplate());

const tripInfo = tripMain.querySelector(`.trip-info`);
render(tripInfo, createRouteInfoTemplate());
render(tripInfo, createRouteCostTemplate());

const tripControls = tripMain.querySelector(`.trip-controls`);
render(tripControls, createTripControlsTemplate());
render(tripControls, createTripControlsFilterTemplate());

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createTripEventsSortTemplate());
render(tripEvents, createTripEditTemplate());
render(tripEvents, createTripOffersTemplate());

const tripPoints = tripEvents.querySelectorAll(`.trip-events__list`);
renderRoutePoints(tripPoints, createTripOffersPointsTemplate(), `beforeend`, ROUTE_POINT);
