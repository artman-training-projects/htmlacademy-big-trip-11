let offerCount = 1;
const addOfferCount = () => offerCount++;

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

const createTripEventEditOfferTemplate = (offers) => {
  return offers ? offers
    .slice()
    .map((offer) => createTripEventOffersTempate(offer))
    .join(``) : ``;
};

const createTripEventOffersTempate = (offer) => {
  const count = addOfferCount();

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.title}-${count}" type="checkbox" name="${offer.title}">
      <label class="event__offer-label" for="${offer.title}-${count}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

export {createTripEventEditOffersTemplate};
