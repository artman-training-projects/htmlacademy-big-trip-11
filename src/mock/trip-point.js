import {getRandomIntegerNumber, generateEventstartDate, generateTripEndDate} from './utils';
import {generateTripOffer} from './trip-offer';
import {generateTripDestination} from './trip-destination';

const Price = {
  MIN: 10,
  MAX: 200,
};

const generateTripPoint = () => {
  let dateFrom = generateEventstartDate();

  return {
    basePrice: getRandomIntegerNumber(Price.MIN, Price.MAX),
    dateFrom,
    dateTo: generateTripEndDate(dateFrom),
    id: new Date().getMilliseconds() + Math.random(),
    [`is_favorite`]: false,
  };
};

const generateTrip = () => Object.assign({}, generateTripPoint(), generateTripDestination(), generateTripOffer());

const generateEvents = (count) => {
  return count ? new Array(count)
    .fill(``)
    .map(generateTrip) : null;
};

export {generateEvents};
