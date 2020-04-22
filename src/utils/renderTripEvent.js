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

  const onButtonRollupClick = () => replaceEventToEdit();
  const onButtonEventReset = () => replaceEditToEvent();
  const onButtonEventSave = () => replaceEditToEvent();

  const tripEvent = new MainTripDayEvent(event);
  const buttonRollup = tripEvent.getElement().querySelector(`.event__rollup-btn`);
  buttonRollup.addEventListener(`click`, onButtonRollupClick);

  const tripEventEdit = new MainTripDayEventEdit(event);
  const buttonEventSave = tripEventEdit.getElement().querySelector(`.event__save-btn`);
  const buttonEventReset = tripEventEdit.getElement().querySelector(`.event__reset-btn`);
  buttonEventSave.addEventListener(`click`, onButtonEventSave);
  buttonEventReset.addEventListener(`click`, onButtonEventReset);

  renderComponent(day, tripEvent);
};
