import {getRandomArrayItem, getRandomIntegerNumber, getRandomArrayFromArray} from '../utils';

const tripPointTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const tripDestinationCitys = [`Amsterdam`, `Geneva`, `Melbourne`, `Chamonix`, `Saint Petersburg`, `Frankfurt`, `Lisbon`, `Sochi`, `Barcelona`, `Helsinki`, `Oslo`, `Moscow`, `Kioto`, `Tokyo`];

const offerCount = {
  MIN: 0,
  MAX: 5,
};

const tripOffers = [{
  title: `title1`,
  price: 20,
}, {
  title: `title2`,
  price: 40,
}, {
  title: `title3`,
  price: 60,
}, {
  title: `title4`,
  price: 80,
}, {
  title: `title5`,
  price: 100,
}];

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

const descriptionCount = {
  MIN: 1,
  MAX: 5,
};

const photoCount = {
  MIN: 1,
  MAX: 5,
};

const price = {
  MIN: 10,
  MAX: 200,
};

const getTripDestinationPhotos = (count) => {
  const photosCount = getRandomIntegerNumber(count.MIN, count.MAX);
  let photos = [];

  for (let i = 0; i < photosCount; i++) {
    photos
      .push({
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: `alt-${Math.random()}`,
      });
  }

  return photos;
};

const getTripDestinationDesccription = (descriptions, length) => {
  const count = getRandomIntegerNumber(length.MIN, length.MAX);
  return getRandomArrayFromArray(descriptions, count).join(` `);
};

const generateTripDestination = () => {
  return {
    destination: {
      name: getRandomArrayItem(tripDestinationCitys),
      description: getTripDestinationDesccription(tripDestinationDescriptions, descriptionCount),
      pictures: getTripDestinationPhotos(photoCount),
    }
  };
};

const generateTripOffer = () => {
  return {
    type: getRandomArrayItem(tripPointTypes),
    offers: [{
      title: `title`,
      price: ``,
    }]
  };
};

const generateTripPoint = () => Object.assign({}, generateTripDestination(), generateTripOffer());

export {generateTripPoint};
