import {createTripControlsMenuTemplate} from './trip-menu';
import {createTripControlsFiltersTemplate} from './trip-filters';

const createTripControlsTemplate = () => {
  return (
    `${createTripControlsMenuTemplate()}
     ${createTripControlsFiltersTemplate()}`
  );
};

export {createTripControlsTemplate};
