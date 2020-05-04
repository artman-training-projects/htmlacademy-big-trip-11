import {tripOffersMap} from '../utils/const';
import {tripDestinationCitys, getTripDestinationDesccription, getTripDestinationPhotos} from '../mock/trip-destination';
import {renderComponent, replaceComponent} from '../utils/element';

import EventComponent from '../components/page-main/trip-day/trip-events__item';
import EventEditComponent from '../components/page-main/event-edit';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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

  render(event) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventComponent.setButtonEventEditClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._setListenersToggleToEvent(this._eventEditComponent);
    this._setListenersDataChange(this._eventEditComponent, event);

    if (oldEventComponent && oldEventEditComponent) {
      replaceComponent(this._eventComponent, oldEventComponent);
      replaceComponent(this._eventEditComponent, oldEventEditComponent);
    } else {
      renderComponent(this._container, this._eventComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replaceComponent(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();
    replaceComponent(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
    }
  }

  _setListenersToggleToEvent(eventEditComponent) {
    eventEditComponent.setButtonEventSaveClickHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    eventEditComponent.setButtonEventResetClickHandler(() => {
      this._replaceEditToEvent();
    });

    eventEditComponent.setButtonEventCloseClickHandler(() => {
      this._replaceEditToEvent();
    });
  }

  _setListenersDataChange(eventEditComponent, event) {
    eventEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    eventEditComponent.setTypeChoiceClickHandler((evt) => {
      if (evt.target.tagName === `INPUT`) {
        return;
      }

      this._onDataChange(this, event, Object.assign({}, event, {
        type: evt.target.innerText,
        offers: tripOffersMap.get(evt.target.innerText),
      }));
    });

    eventEditComponent.setDestiantionChoiceInputHandler((evt) => {
      const invalidCity = !tripDestinationCitys.find((city) => city === evt.target.value);

      if (invalidCity) {
        return;
      }

      this._onDataChange(this, event, Object.assign({}, event, {
        destination: {
          name: evt.target.value,
          description: getTripDestinationDesccription(),
          pictures: getTripDestinationPhotos(),
        }
      }));
    });
  }
}
