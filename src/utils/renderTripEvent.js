import {renderComponent, replaceComponent} from './element';
import MainTripDayEvent from '../components/page-main/trip-day/trip-events__item';
import MainTripDayEventEdit from '../components/page-main/event-edit';

export const renderTripEvent = (event, day) => {
  const replaceEventToEdit = () => {
    replaceComponent(tripEventEdit, tripEvent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEditToEvent = () => {
    replaceComponent(tripEvent, tripEventEdit);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
    }
  };

  const tripEvent = new MainTripDayEvent(event);
  tripEvent.setButtonRollupClickHandler(() => {
    replaceEventToEdit();
  });

  const tripEventEdit = new MainTripDayEventEdit(event);
  tripEventEdit.setButtonEventSaveClick(() => {
    replaceEditToEvent();
  });
  tripEventEdit.setButtonEventResetClick(() => {
    replaceEditToEvent();
  });

  renderComponent(day, tripEvent);
};
