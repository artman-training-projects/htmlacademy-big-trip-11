import {renderComponent, replaceComponent} from '../utils/element';

import MainTripDayEvent from '../components/page-main/trip-day/trip-events__item';
import MainTripDayEventEdit from '../components/page-main/event-edit';

export default class EventController {
  constructor(container) {
    this._mainTripDayEvent = null;
    this._mainTripDayEventEdit = null;
    this._container = container;
  }

  render(event) {
    const oldMainTripDayEvent = this._mainTripDayEvent;
    const oldMainTripDayEventEdit = this._mainTripDayEventEdit;

    this._mainTripDayEvent = new MainTripDayEvent(event);
    this._mainTripDayEventEdit = new MainTripDayEventEdit(event);

    const replaceEventToEdit = () => {
      replaceComponent(this._mainTripDayEventEdit, this._mainTripDayEvent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const replaceEditToEvent = () => {
      replaceComponent(this._mainTripDayEvent, this._mainTripDayEventEdit);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToEvent();
      }
    };

    this._mainTripDayEvent.setButtonRollupClickHandler(() => {
      replaceEventToEdit();
    });

    this._mainTripDayEventEdit.setButtonEventSaveClick(() => {
      replaceEditToEvent();
    });

    this._mainTripDayEventEdit.setButtonEventResetClick(() => {
      replaceEditToEvent();
    });

    this._mainTripDayEventEdit.setButtonEventCloseClick(() => {
      replaceEditToEvent();
    });

    renderComponent(this._container, this._mainTripDayEvent);
  }
}
