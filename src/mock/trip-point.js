import {getRandomIntegerNumber} from '../utils';
import {generateTripOffer} from '../mock/trip-offer';
import {generateTripDestination} from '../mock/trip-destination';

const price = {
  MIN: 10,
  MAX: 200,
};

const generateTripPoint = () => {
  return {
    basePrice: getRandomIntegerNumber(price.MIN, price.MAX),
    dateFrom: new Date(Date.now()),
    dateTo: new Date(Date.now() + getRandomIntegerNumber(1, 4) * 60 * 60 * 1000),
  };
};

const generateTrip = () => Object.assign({}, generateTripPoint(), generateTripDestination(), generateTripOffer());

const generateTrips = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTrip);
};

export {generateTrip, generateTrips};
