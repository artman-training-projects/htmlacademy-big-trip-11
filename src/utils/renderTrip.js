import {renderComponent} from './element';
import {renderTripEvent} from './renderTripEvent';
import MainTripDay from '../components/page-main/trip-day/trip-days__item';

export const renderTrip = (events, tripDays) => {

  let dayFrom;
  let daysCount = 0;
  let tripDay;

  for (const event of events) {
    if (dayFrom !== event.dateFrom.getDate()) {
      dayFrom = event.dateFrom.getDate();
      daysCount++;
      dayFrom = event.dateFrom.getDate();
      const dayTrip = new MainTripDay(daysCount, event);
      tripDay = dayTrip.getElement().querySelector(`.trip-events__list`);
      renderComponent(tripDays, dayTrip);
    }

    renderTripEvent(event, tripDay);
  }
};
