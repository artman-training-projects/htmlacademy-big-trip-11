import {Millisecond} from './const';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

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
  return new Date(Date.now() - diffDays * Millisecond.IN_DAY);
};

const generateTripEndDate = (tripStart) => {
  const diffHours = getRandomIntegerNumber(2, 20);
  const diffMinutes = getRandomIntegerNumber(0, 59);
  const diffTime = diffHours * Millisecond.IN_HOUR + diffMinutes * Millisecond.IN_MINUTE;

  return new Date(tripStart.getTime() + diffTime);
};

export {render, getRandomIntegerNumber, getRandomArrayItem, getRandomArrayFromArray, generateTripStartDate, generateTripEndDate};
