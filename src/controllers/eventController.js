import {renderComponent, replaceComponent} from '../utils/element';

import MainTripDayEvent from '../components/page-main/trip-day/trip-events__item';
import MainTripDayEventEdit from '../components/page-main/event-edit';

export default class EventController {
  constructor(container, onDataChange) {
    this._mainTripDayEvent = null;
    this._mainTripDayEventEdit = null;
    this._onDataChange = onDataChange;
    this._container = container;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    const oldMainTripDayEvent = this._mainTripDayEvent;
    const oldMainTripDayEventEdit = this._mainTripDayEventEdit;

    this._mainTripDayEvent = new MainTripDayEvent(event);
    this._mainTripDayEventEdit = new MainTripDayEventEdit(event);

    if (oldMainTripDayEvent && oldMainTripDayEventEdit) {
      replaceComponent(this._mainTripDayEvent, oldMainTripDayEvent);
      replaceComponent(this._mainTripDayEventEdit, oldMainTripDayEventEdit);
    } else {
      renderComponent(this._container, this._mainTripDayEvent);
    }

    this._mainTripDayEvent.setButtonRollupClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._mainTripDayEventEdit.setButtonEventSaveClick(() => {
      this._replaceEditToEvent();
    });

    this._mainTripDayEventEdit.setButtonEventResetClick(() => {
      this._replaceEditToEvent();
    });

    this._mainTripDayEventEdit.setButtonEventCloseClick(() => {
      this._replaceEditToEvent();
    });

    this._mainTripDayEventEdit.setFavoriteClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });
  }

  _replaceEventToEdit() {
    replaceComponent(this._mainTripDayEventEdit, this._mainTripDayEvent);
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replaceComponent(this._mainTripDayEvent, this._mainTripDayEventEdit);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
    }
  }
}
