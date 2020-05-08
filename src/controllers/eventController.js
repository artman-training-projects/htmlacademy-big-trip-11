import {renderComponent, replaceComponent, removeComponent, RenderPosition} from '../utils/element';

import EventComponent from '../components/page-main/trip-day/trip-events__item';
import EventEditComponent from '../components/page-main/event-edit';

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
  [`is_favorite`]: false,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    this._mode = mode;
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventComponent.setButtonEventEditClickHandler(() => this._replaceEventToEdit());
    this._setListenersToggleToEvent(this._eventEditComponent, event);
    this._setListenersDataChange(this._eventEditComponent, event);

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

        const eventContainer = document.querySelector(`.trip-events__list`);
        renderComponent(eventContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);
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
  }

  _replaceEventToEdit() {
    this._onViewChange();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    replaceComponent(this._eventEditComponent, this._eventComponent);
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
        this._onDataChange(this, EmptyEvent, null);
      }

      this._onDataChange(this, event, event);
      this._replaceEditToEvent();
    }
  }

  _setListenersToggleToEvent(eventEditComponent, event) {
    eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = eventEditComponent.getData();
      this._onDataChange(this, event, data);
      this._replaceEditToEvent();
    });

    eventEditComponent.setResetHandler(() => {
      this._onDataChange(this, event, null);
      this._replaceEditToEvent();
    });

    eventEditComponent.setCloseHandler(() => {
      eventEditComponent.reset();
      this._onDataChange(this, event, event);
      this._replaceEditToEvent();
    });
  }

  _setListenersDataChange(eventEditComponent, event) {
    eventEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        [`is_favorite`]: !event.is_favorite,
      }));
    });
  }
}
