import {renderComponent, replaceComponent, removeComponent, RenderPosition} from '../utils/element';

import EventEditComponent from '../components/main/main-event-edit';
import EventComponent from '../components/main/main-day-event-item';

import EventAdapter from '../models/eventsAdapter';

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

const parseFormData = (formData, elseData, eventsModel) => {
  const name = formData.get(`event-destination`);
  const description = (eventsModel.getDestinations().find((destination) => destination.name === name));

  const type = formData.get(`event-type`);
  const offers = eventsModel.getOffersByType().get(formData.get(`event-type`));

  return new EventAdapter({
    "id": elseData.id,
    "base_price": +formData.get(`event-price`),
    "date_from": new Date(formData.get(`event-start-time`)),
    "date_to": new Date(formData.get(`event-end-time`)),
    "destination": description,
    "type": type,
    "offers": offers,
  });
};

export default class EventController {
  constructor(container, onDataChange, onViewChange, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
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
    this._eventEditComponent = new EventEditComponent(event, this._eventsModel);

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

      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData, event, this._eventsModel);

      this._onDataChange(this, event, data);
      this._mode = Mode.DEFAULT;
    });

    this._eventEditComponent.setResetEventHandler(() => {
      this._onDataChange(this, event, null);
      this._mode = Mode.DEFAULT;
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      event[`isFavorite`] = !event[`isFavorite`];
      this._eventsModel.updateEvent(event.id, event);
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
