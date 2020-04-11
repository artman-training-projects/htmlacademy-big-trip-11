const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomIntegerNumber = (min, max) => (min + Math.floor(Math.random() * (max - min)));

const getRandomArrayItem = (array) => (array[getRandomIntegerNumber(0, array.length)]);

const getRandomArrayFromArray = (array, length) => {
  let oldArray = array.slice();
  let newArray = [];

  for (let i = 0; i < length; i++) {
    let index = getRandomIntegerNumber(0, oldArray.length);
    newArray.push(oldArray[index]);
    oldArray.splice(index, 1);
  }

  return newArray;
};

const getTime = (datetime) => (`${datetime.getHours()}:${datetime.getMinutes() < 10 ? 0 + `` + datetime.getMinutes() : datetime.getMinutes()}`);

const getDate = (datetime) => (`${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}`);

export {render, getRandomIntegerNumber, getRandomArrayItem, getRandomArrayFromArray, getTime, getDate};
