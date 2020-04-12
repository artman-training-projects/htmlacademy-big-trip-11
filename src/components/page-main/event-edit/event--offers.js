import {createTripEventEditOfferTemplate} from './event__offer';

const createTripEventEditOffersTemplate = (offers) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createTripEventEditOfferTemplate(offers)}
      </div>
    </section>`
  );
};

export {createTripEventEditOffersTemplate};
