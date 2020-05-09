import {getRandomId, getRandomIntegerNumber, generateEventStartDate, generateEventEndDate} from './utils';


const Price = {
  MIN: 10,
  MAX: 200,
};

export const generateEventPoint = () => {
  let dateFrom = generateEventStartDate();

  return {
    basePrice: getRandomIntegerNumber(Price.MIN, Price.MAX),
    dateFrom,
    dateTo: generateEventEndDate(dateFrom),
    id: getRandomId(),
    [`is_favorite`]: Math.random() > 0.7 ? true : false,
  };
};
