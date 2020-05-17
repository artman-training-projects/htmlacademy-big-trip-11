import {monthMap} from '../../../utils/const';
export const createMainDayTemplate = (day, number) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${number ? number : ``}</span>
        <time class="day__date" datetime="${day ? day : ``}">${day ? monthMap.get(new Date(day).getMonth()) : ``} ${day ? new Date(day).getDate() : ``}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};
