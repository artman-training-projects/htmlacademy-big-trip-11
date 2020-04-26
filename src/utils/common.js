import moment from 'moment';
import {Millisecond, monthMap, SHOW_OFFERS} from './const';

export const parseTime = (timestamp) => moment(timestamp).format(`HH:mm`);
export const parseDate = (timestamp) => moment(timestamp).format(`DD/MM/YY`);

export const getDiffTime = (from, to) => {
  const diff = (to - from);
  let diffString;

  if ((diff / Millisecond.IN_DAY) > 1) {
    diffString = `${Math.trunc(diff / Millisecond.IN_DAY)}D ${Math.trunc(diff % Millisecond.IN_DAY / Millisecond.IN_HOUR)}H ${diff % Millisecond.IN_HOUR / Millisecond.IN_MINUTE}M`;
  } else if ((diff / Millisecond.IN_HOUR) > 1) {
    diffString = `${Math.trunc(diff % Millisecond.IN_DAY / Millisecond.IN_HOUR)}H ${diff % Millisecond.IN_HOUR / Millisecond.IN_MINUTE}M`;
  } else {
    diffString = `${diff % Millisecond.IN_HOUR / Millisecond.IN_MINUTE}M`;
  }

  return diffString;
};

export const getRoute = (events) => {
  const citys = new Set(events
    .slice()
    .map((event) => event.destination.name)
  );

  let route = [...citys];

  if (route <= SHOW_OFFERS) {
    route = route
      .map((city) => `${city}`)
      .join(` — `);
  } else {
    route = [route[0], route[route.length - 1]]
      .map((city) => `${city}`)
      .join(` — ... — `);
  }

  return route;
};

export const getRouteDates = (events) => {
  let dates = events.slice();
  dates = [dates[0].dateFrom, dates[dates.length - 1].dateTo];

  const getDateStartString = () => {
    return `${monthMap.get(dates[0].getMonth())} ${dates[0].getDate()}`;
  };

  const getDateFinishString = () => {
    return monthMap.get(dates[0].getMonth()) === monthMap.get(dates[1].getMonth()) ?
      `${dates[1].getDate()}` :
      `${monthMap.get(dates[1].getMonth())} ${dates[1].getDate()}`;
  };

  return `${getDateStartString()} - ${getDateFinishString()}`;
};

export const getEventTime = (from, to) => {
  return (to - from);
};

export const calcFullPrice = (events, prices) => {
  return events ? events
    .slice()
    .map((event) => event[prices] + calcFullPrice(event.offers, `price`))
    .reduce((sum, price) => sum + price) : 0;
};
