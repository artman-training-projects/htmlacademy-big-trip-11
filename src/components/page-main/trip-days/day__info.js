import {monthMap} from '../../../helpers/const';

const createTripDayInfoTemplate = (point, count) => {
  return (
    `<div class="day__info">
      <span class="day__counter">${count}</span>
      <time class="day__date" datetime="${point.dateFrom}">${monthMap.get(point.dateFrom.getMonth())} ${point.dateFrom.getDate()}</time>
    </div>

    <ul class="trip-events__list">
    </ul>`
  );
};

export {createTripDayInfoTemplate};
