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
      filteredEvents = trip.filter((event) => {
        return event.dateTo instanceof Date ? moment(event.dateTo.getTime()) > moment() : null;
      });
      break;
    case FilterType.PAST:
      filteredEvents = trip.filter((event) => {
        return event.dateTo instanceof Date ? moment(event.dateTo.getTime()) < moment() : null;
      });
      break;
  }

  return filteredEvents;
};
