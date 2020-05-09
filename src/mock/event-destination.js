import {DESTINATION_CITY} from '../utils/const';
import {getRandomIntegerNumber, getRandomArrayItem, getRandomArrayFromArray} from './utils';

export const eventDestinationDescriptions = [
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

export const getEventDestinationPhotos = (count = PhotoCount) => {
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

export const getEventDestinationDescription = (descriptions = eventDestinationDescriptions, length = DescriptionCount) => {
  const count = getRandomIntegerNumber(length.MIN, length.MAX);
  return getRandomArrayFromArray(descriptions, count).join(` `);
};

export const generateEventDestination = () => {
  return {
    destination: {
      description: getEventDestinationDescription(eventDestinationDescriptions, DescriptionCount),
      name: getRandomArrayItem(DESTINATION_CITY),
      pictures: getEventDestinationPhotos(PhotoCount),
    }
  };
};
