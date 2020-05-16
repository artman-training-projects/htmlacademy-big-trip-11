import {SortType} from '../../components/main/sort';
import {getEventTime} from '../../utils/common';

export const getSortedEvents = (events, sortType = SortType.EVENT) => {
  let sortedEvents = events.slice();

  switch (sortType) {
    case SortType.EVENT:
      sortedEvents.sort((a, b) => Date.parse(a.dateFrom) - Date.parse(b.dateFrom));
      break;
    case SortType.TIME:
      sortedEvents.sort((a, b) => getEventTime(b.dateFrom, b.dateTo) - getEventTime(a.dateFrom, a.dateTo));
      break;
    case SortType.PRICE:
      sortedEvents.sort((a, b) => b.basePrice - a.basePrice);
      break;
  }

  return sortedEvents;
};
