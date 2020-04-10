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

export {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayFromArray};
