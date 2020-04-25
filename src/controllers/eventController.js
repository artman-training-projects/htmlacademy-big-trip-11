import {renderComponent, replaceComponent} from '../utils/element';

import MainTripDayEvent from '../components/page-main/trip-day/trip-events__item';
import MainTripDayEventEdit from '../components/page-main/event-edit';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._mainTripDayEvent = null;
    this._mainTripDayEventEdit = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
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

    this._mainTripDayEventEdit.setButtonEventSaveClick((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    this._mainTripDayEventEdit.setButtonEventResetClick(() => {
      this._replaceEditToEvent();
    });

    this._mainTripDayEventEdit.setButtonEventCloseClick(() => {
      this._replaceEditToEvent();
    });

    this._mainTripDayEventEdit.setFavoriteClick(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replaceComponent(this._mainTripDayEventEdit, this._mainTripDayEvent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mainTripDayEventEdit.reset();
    replaceComponent(this._mainTripDayEvent, this._mainTripDayEventEdit);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
    }
  }
}
