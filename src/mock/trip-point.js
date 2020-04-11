import {getRandomIntegerNumber, getStartDate, generateTripDates} from '../utils';
import {generateTripOffer} from '../mock/trip-offer';
import {generateTripDestination} from '../mock/trip-destination';

const price = {
  MIN: 10,
  MAX: 200,
};

const generateTripPoint = () => {
  return {
    basePrice: getRandomIntegerNumber(price.MIN, price.MAX),
    dateFrom: generateTripDates(),
    dateTo: generateTripDates(),
  };
};

const generateTrip = () => Object.assign({}, generateTripPoint(), generateTripDestination(), generateTripOffer());

const generateTrips = (count) => {
  const startDay = getStartDate();
  console.log(startDay);

  return new Array(count)
    .fill(``)
    .map(generateTrip);
};

export {generateTrips};
