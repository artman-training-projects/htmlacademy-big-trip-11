const createTripEventOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const createTripEventOffersTemplate = (offers) => {
  const SHOW_OFFERS = 3;

  return offers ? offers
    .slice(0, SHOW_OFFERS)
    .map((offer) => createTripEventOfferTemplate(offer))
    .join(``) : ``;
};

export {createTripEventOffersTemplate};
