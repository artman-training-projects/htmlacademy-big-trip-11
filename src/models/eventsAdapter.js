export default class EventAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.dateFrom = new Date(data[`date_from`]);
    this.dateTo = new Date(data[`date_to`]);
    this.destination = data[`destination`];
    this.basePrice = data[`base_price`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`];
  }

  toRAW() {
    return {
      "id": this.id,
      "type": this.type,
      "date_from": this.dateFrom,
      "date_to": this.dateTo,
      "destination": this.destination,
      "base_price": this.basePrice,
      "is_favorite": this.isFavorite,
      "offers": this.offers,
    };
  }

  static parseEvent(event) {
    return new EventAdapter(event);
  }

  static parseEvents(events) {
    return events.map(EventAdapter.parseEvent);
  }

  static clone(event) {
    return new EventAdapter(event.toRAW());
  }
}
