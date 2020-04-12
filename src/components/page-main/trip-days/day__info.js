import {monthMap} from '../../../const';

const createTripDayInfoTemplate = (point) => {
  return (
    `<div class="day__info">
      <span class="day__counter">${1}</span>
      <time class="day__date" datetime="${point[0].dateFrom}">${monthMap.get(point[0].dateFrom.getMonth())} ${point[0].dateFrom.getDay()}</time>
    </div>`
  );
};

export {createTripDayInfoTemplate};
