import {tripOffersMap, TRANSFER_TYPE, ACTIVITY_TYPE} from '../utils/const';
import {getRandomArrayItem} from './utils';

export const generateEventOffers = () => {
  const pointTypes = [...TRANSFER_TYPE, ...ACTIVITY_TYPE];
  const type = getRandomArrayItem(pointTypes);

  return {
    type,
    offers: tripOffersMap.get(type),
  };
};
