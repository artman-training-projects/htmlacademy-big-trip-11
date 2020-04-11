import {tripOffersMap} from '../const';
import {getRandomArrayItem} from '../utils';

const tripPointTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const generateTripOffer = () => {
  const type = getRandomArrayItem(tripPointTypes);

  return {
    type,
    offers: tripOffersMap.get(type),
  };
};

export {generateTripOffer};
