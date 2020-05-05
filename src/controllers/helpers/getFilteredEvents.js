import moment from 'moment';
import {FilterType} from '../filterController';

export const getFilteredEvents = (events, filterType = FilterType.EVERYTHING) => {
  const trip = events.slice();
  let filteredEvents = [];

  switch (filterType) {
    case FilterType.EVERYTHING:
      filteredEvents = trip;
      break;
    case FilterType.FUTURE:
      filteredEvents = trip.filter((event) => moment(event.dateTo.getTime()) > moment());
      break;
    case FilterType.PAST:
      filteredEvents = trip.filter((event) => moment(event.dateTo.getTime()) < moment());
      break;
  }

  return filteredEvents;
};
