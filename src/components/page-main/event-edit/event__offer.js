let offerCount = 1;
const addOfferCount = () => offerCount++;

const createTripEventOffersTempate = (offer) => {
  const count = addOfferCount();

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.title}-${count}" type="checkbox" name="${offer.title}" ${Math.random() > 0.5 ? `checked` : ``}>
      <label class="event__offer-label" for="${offer.title}-${count}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

const createTripEventEditOfferTemplate = (offers) => {
  return offers ? offers
    .slice()
    .map((offer) => createTripEventOffersTempate(offer))
    .join(``) : ``;
};

export {createTripEventEditOfferTemplate};
