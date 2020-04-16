import {createTripEventEditHeaderTemplate} from './event-edit/event__header';
import {createTripEventEditOffersTemplate} from './event-edit/event--offers';
import {createTripEventEditDestinationTemplate} from './event-edit/event--destination';

const createTripEventEditTemplate = (event) => {
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createTripEventEditHeaderTemplate(event)}

      <section class="event__details">
        ${createTripEventEditOffersTemplate(event.offers)}

        ${createTripEventEditDestinationTemplate(event.destination)}
      </section>
    </form>`
  );
};

export {createTripEventEditTemplate};
