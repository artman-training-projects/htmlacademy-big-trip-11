import {renderComponent, replaceComponent, removeComponent, RenderPosition} from '../utils/element';

import EventEditComponent from '../components/main/main-event-edit';
import EventComponent from '../components/main/main-day-event-item';

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`,
};

export const EmptyEvent = {
  basePrice: ``,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: ``,
  type: `Taxi`,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventComponent.setOpenEditHandler(() => {
      this._replaceEventToEdit();
      this._mode = Mode.EDIT;
    });

    this._eventEditComponent.setCloseEditHandler(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.DEFAULT;
    });

    this._eventEditComponent.setSubmitEventHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      this._onDataChange(this, event, Object.assign({}, event, data));
      this._mode = Mode.DEFAULT;
    });

    this._eventEditComponent.setResetEventHandler(() => {
      this._onDataChange(this, event, null);
      this._mode = Mode.DEFAULT;
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      const data = this._eventEditComponent.getData();
      this._onDataChange(this, event, Object.assign({}, event, data, {
        [`is_favorite`]: !event[`is_favorite`],
      }));
      this._replaceEventToEdit();
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventComponent && oldEventEditComponent) {
          replaceComponent(this._eventComponent, oldEventComponent);
          replaceComponent(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditToEvent();
        } else {
          renderComponent(this._container, this._eventComponent);
        }
        break;
      case Mode.ADD:
        if (oldEventComponent && oldEventEditComponent) {
          removeComponent(oldEventEditComponent);
          removeComponent(oldEventComponent);
        }

        renderComponent(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        break;
    }
  }

  destroy() {
    removeComponent(this._eventEditComponent);
    removeComponent(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }

    if (this._mode === Mode.ADD) {
      this._onDataChange(this._eventEditComponent, EmptyEvent, null);
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replaceComponent(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();

    if (document.contains(this._eventEditComponent.getElement())) {
      replaceComponent(this._eventComponent, this._eventEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADD) {
        this._onDataChange(this, event, null);
        this._mode = Mode.DEFAULT;
      }

      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
