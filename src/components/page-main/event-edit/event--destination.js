const createTripEventEditDestinationTemplate = (destination) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${getPhotos(destination.pictures)}
        </div>
      </div>
    </section>`
  );
};

const getPhotos = (photos) => {
  return photos ? photos
    .slice()
    .map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)
    .join(``) : ``;
};

export {createTripEventEditDestinationTemplate};
