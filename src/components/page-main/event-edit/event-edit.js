import {createTripEventEditHeaderTemplate} from './event__header';
import {createTripEventEditOffersTemplate} from './event--offers';
import {createTripEventEditDestinationTemplate} from './event--destination';

const createTripEventEditTemplate = () => {
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createTripEventEditHeaderTemplate()}

      <section class="event__details">
        ${createTripEventEditOffersTemplate()}

        ${createTripEventEditDestinationTemplate()}
      </section>
    </form>`
  );
};

export {createTripEventEditTemplate};
