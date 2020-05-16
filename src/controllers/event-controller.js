import {renderComponent, replaceComponent, removeComponent, RenderPosition} from '../utils/element';

import EventEditComponent from '../components/main/event-edit';
import EventComponent from '../components/main/event';

import EventAdapter from '../models/events-adapter';

const SHAKE_ANIMATION_TIMEOUT = 1000;

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
  type: `taxi`,
};

const parseFormData = (formData, elseData, eventsModel) => {
  const name = formData.get(`event-destination`);
  const description = (eventsModel.getDestinations().find((destination) => destination.name === name));

  const type = formData.get(`event-type`);
  const checkedOffersTitle = formData.getAll(`event-offer`);
  const allOffers = eventsModel.getOffersByType().get(type);
  const checkedOffers = allOffers.filter((offer) => checkedOffersTitle.includes(offer.title));

  return new EventAdapter({
    "id": elseData.id,
    "base_price": +formData.get(`event-price`),
    "date_from": new Date(formData.get(`event-start-time`)),
    "date_to": new Date(formData.get(`event-end-time`)),
    "destination": description,
    "type": type,
    "offers": checkedOffers,
  });
};

export default class EventController {
  constructor(container, onDataChange, onViewChange, eventsModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._api = api;
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

      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
      });

      this._onDataChange(this, event, data);
      this._mode = Mode.DEFAULT;
    });

    this._eventEditComponent.setResetEventHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, event, null);
      this._mode = Mode.DEFAULT;
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      event[`isFavorite`] = !event[`isFavorite`];

      this._api.updateEvent(event.id, event)
        .then((eventModel) => {
          this._eventsModel.updateEvent(event.id, eventModel);
        });
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

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replaceComponent(this._eventEditComponent, this._eventComponent);
    this._eventEditComponent.applyFlatpickr();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();

    if (document.contains(this._eventEditComponent.getElement())) {
      replaceComponent(this._eventComponent, this._eventEditComponent);
    }

    if (this._mode === Mode.ADD) {
      this._onDataChange(this, EmptyEvent, null);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
