import {createTripControlsMenuTemplate} from './controls/trip-menu';
import {createTripControlsFiltersTemplate} from './controls/trip-filters';

const createTripControlsTemplate = () => {
  return (
    `${createTripControlsMenuTemplate()}
     ${createTripControlsFiltersTemplate()}`
  );
};

export {createTripControlsTemplate};
