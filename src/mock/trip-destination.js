import {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayFromArray} from './utils';

const tripDestinationCitys = [`Amsterdam`, `Geneva`, `Melbourne`, `Chamonix`, `Saint Petersburg`, `Frankfurt`, `Lisbon`, `Sochi`, `Barcelona`, `Helsinki`, `Oslo`, `Moscow`, `Kioto`, `Tokyo`];

const tripDestinationDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const DescriptionCount = {
  MIN: 1,
  MAX: 5,
};

const PhotoCount = {
  MIN: 1,
  MAX: 5,
};

const getTripDestinationPhotos = (count) => {
  const photosCount = getRandomIntegerNumber(count.MIN, count.MAX);
  return new Array(photosCount)
    .fill(``)
    .map(() => {
      return {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: `alt-${Math.random()}`,
      };
    });
};

const getTripDestinationDesccription = (descriptions, length) => {
  const count = getRandomIntegerNumber(length.MIN, length.MAX);
  return getRandomArrayFromArray(descriptions, count).join(` `);
};

const generateTripDestination = () => {
  return {
    destination: {
      name: getRandomArrayItem(tripDestinationCitys),
      description: getTripDestinationDesccription(tripDestinationDescriptions, DescriptionCount),
      pictures: getTripDestinationPhotos(PhotoCount),
    }
  };
};

export {generateTripDestination};
