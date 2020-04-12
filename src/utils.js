import {Millisecond, monthMap} from './const';

const getRandomIntegerNumber = (min, max) => (min + Math.floor(Math.random() * (max - min)));

const getRandomArrayItem = (array) => (array[getRandomIntegerNumber(0, array.length)]);

const getRandomArrayFromArray = (array, length) => {
  let oldArray = [...array];
  let newArray = [];

  for (let i = 0; i < length; i++) {
    let index = getRandomIntegerNumber(0, oldArray.length);
    newArray.push(oldArray[index]);
    oldArray.splice(index, 1);
  }

  return newArray;
};

const generateTripStartDate = () => {
  const diffDays = getRandomIntegerNumber(1, 5);
  const diffHours = getRandomIntegerNumber(0, 20);
  const diffMinutes = getRandomIntegerNumber(0, 59);
  const diffTime = diffDays * Millisecond.IN_DAY + diffHours * Millisecond.IN_HOUR + diffMinutes * Millisecond.IN_MINUTE;
  return new Date(Date.now() - diffTime);
};

const generateTripEndDate = (tripStart) => {
  const diffHours = getRandomIntegerNumber(0, 40);
  const diffMinutes = getRandomIntegerNumber(0, 59);
  const diffTime = diffHours * Millisecond.IN_HOUR + diffMinutes * Millisecond.IN_MINUTE;

  return new Date(tripStart.getTime() + diffTime);
};

const parseTime = (timestamp) => {
  return [timestamp.getHours(), timestamp.getMinutes()]
    .map((value) => value < 10 ? `0` + value : value)
    .join(`:`);
};

const parseDate = (timestamp) => {
  return [...[timestamp.getDay(), timestamp.getMonth()]
    .map((value) => value < 10 ? `0` + value : value), timestamp.getFullYear().toString().substr(2)]
    .join(`/`);
};

const getDiffTime = (from, to) => {
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

const sortByDayFrom = (events) => {
  return events
    .slice()
    .sort((a, b) => a.dateFrom < b.dateFrom ? -1 : 1);
};

let offerCount = 1;
const addOfferCount = () => offerCount++;

const calcFullPrice = (events) => {
  return events
    .slice()
    .map((event) => event.basePrice)
    .reduce((sum, price) => sum + price);
};

const getRoute = (events) => {
  const citys = new Set(events
    .slice()
    .map((event) => event.destination.name)
  );

  let route = [...citys];

  if (route <= 3) {
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

const getRouteDates = (events) => {
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

export {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayFromArray, generateTripStartDate, generateTripEndDate, parseTime, parseDate, getDiffTime, sortByDayFrom, addOfferCount, calcFullPrice, getRoute, getRouteDates};
