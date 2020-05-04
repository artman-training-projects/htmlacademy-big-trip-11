import {Millisecond} from '../utils/const';

export const getRandomIntegerNumber = (min, max) => (min + Math.floor(Math.random() * (max - min)));

export const getRandomArrayItem = (array) => (array[getRandomIntegerNumber(0, array.length)]);

export const getRandomArrayFromArray = (array, length) => {
  let oldArray = Array.from(array);
  let newArray = [];

  for (let i = 0; i < length; i++) {
    let index = getRandomIntegerNumber(0, oldArray.length);
    newArray.push(oldArray[index]);
    oldArray.splice(index, 1);
  }

  return newArray;
};

export const generateTripStartDate = () => {
  const diffDays = getRandomIntegerNumber(1, 5);
  const diffHours = getRandomIntegerNumber(0, 20);
  const diffMinutes = getRandomIntegerNumber(0, 59);
  const diffTime = diffDays * Millisecond.IN_DAY + diffHours * Millisecond.IN_HOUR + diffMinutes * Millisecond.IN_MINUTE;
  return new Date(Date.now() - diffTime);
};

export const generateTripEndDate = (tripStart) => {
  const diffHours = getRandomIntegerNumber(0, 20);
  const diffMinutes = getRandomIntegerNumber(0, 59);
  const diffTime = diffHours * Millisecond.IN_HOUR + diffMinutes * Millisecond.IN_MINUTE;
  return new Date(tripStart.getTime() + diffTime);
};

