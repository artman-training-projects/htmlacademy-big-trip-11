"use strict";

const createRouteTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    </section>`
  );
};

const createRouteInfoTemplate = () => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`
  );
};

const createRouteCostTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createRouteTemplate());

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createRouteInfoTemplate());
render(tripInfo, createRouteCostTemplate());

// /////////////////////////////////
// const siteMainElement = document.querySelector(`.main`);
// const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

// render(siteHeaderElement, createSiteMenuTemplate());
// render(siteMainElement, createFilterTemplate());
// render(siteMainElement, createBoardTemplate());

// const taskListElement = siteMainElement.querySelector(`.board__tasks`);
// const boardElement = siteMainElement.querySelector(`.board`);

// render(taskListElement, createTaskEditTemplate());

// for (let i = 0; i < TASK_COUNT; i++) {
//   render(taskListElement, createTaskTemplate());
// }

// render(boardElement, createLoadMoreButtonTemplate());
