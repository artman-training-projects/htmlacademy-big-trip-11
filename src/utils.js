import {Millisecond} from './const';

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

export {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayFromArray, generateTripStartDate, generateTripEndDate, parseTime, parseDate, getDiffTime};
