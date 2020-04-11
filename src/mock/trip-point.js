import {getRandomIntegerNumber, generateTripStartDate, generateTripEndDate} from '../utils';
import {generateTripOffer} from '../mock/trip-offer';
import {generateTripDestination} from '../mock/trip-destination';

const Price = {
  MIN: 10,
  MAX: 200,
};

const generateTripPoint = () => {
  let dateFrom = generateTripStartDate();

  return {
    basePrice: getRandomIntegerNumber(Price.MIN, Price.MAX),
    dateFrom,
    dateTo: generateTripEndDate(dateFrom),
  };
};

const generateTrip = () => Object.assign({}, generateTripPoint(), generateTripDestination(), generateTripOffer());

const generateTrips = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTrip);
};

export {generateTrips};
