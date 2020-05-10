export const SHOW_OFFERS = 3;

export const Millisecond = {
  IN_DAY: 86400000,
  IN_HOUR: 3600000,
  IN_MINUTE: 60000,
};

export const monthMap = new Map([
  [0, `JAN`],
  [1, `FEB`],
  [2, `MAR`],
  [3, `APR`],
  [4, `MAY`],
  [5, `JUN`],
  [6, `JUL`],
  [7, `AUG`],
  [8, `SEP`],
  [9, `OCT`],
  [10, `NOV`],
  [11, `DEC`],
]);

export const DESTINATION_CITY = [`Amsterdam`, `Geneva`, `Melbourne`, `Chamonix`, `Saint Petersburg`, `Frankfurt`, `Lisbon`, `Sochi`, `Barcelona`, `Helsinki`, `Oslo`, `Moscow`, `Kioto`, `Tokyo`];

export const TRANSFER_TYPE = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

export const ACTIVITY_TYPE = [`check-in`, `sightseeing`, `restaurant`];

export const tripPointTypesMap = new Map([
  [`taxi`, `Taxi to`],
  [`bus`, `Bus to`],
  [`train`, `Train to`],
  [`ship`, `Ship to`],
  [`transport`, `Transport to`],
  [`drive`, `Drive to`],
  [`flight`, `Flight to`],
  [`check-in`, `Check-in in`],
  [`sightseeing`, `Sightseeing in`],
  [`restaurant`, `Restaurant in`],
]);

export const tripOffersMap = new Map([
  [`taxi`, [{
    "title": `Upgrade to a business class`,
    "price": 150
  }, {
    "title": `Choose the radio station`,
    "price": 50
  }, {
    "title": `Choose temperature`,
    "price": 120
  }, {
    "title": `Drive quickly, I'm in a hurry`,
    "price": 130
  }, {
    "title": `Drive slowly`,
    "price": 70
  }]],
  [`bus`, [{
    "title": `Infotainment system`,
    "price": 30
  }, {
    "title": `Order meal`,
    "price": 190
  }, {
    "title": `Choose seats`,
    "price": 90
  }]],
  [`train`, [{
    "title": `Book a taxi at the arrival point`,
    "price": 40
  }, {
    "title": `Order a breakfast`,
    "price": 160
  }, {
    "title": `Wake up at a certain time`,
    "price": 170
  }]],
  [`flight`, [{
    "title": `Choose meal`,
    "price": 40
  }, {
    "title": `Choose seats`,
    "price": 130
  }, {
    "title": `Upgrade to comfort class`,
    "price": 180
  }, {
    "title": `Upgrade to business class`,
    "price": 80
  }, {
    "title": `Add luggage`,
    "price": 180
  }, {
    "title": `Business lounge`,
    "price": 160
  }]],
  [`check-in`, [{
    "title": `Choose the time of check-in`,
    "price": 120
  }, {
    "title": `Choose the time of check-out`,
    "price": 90
  }, {
    "title": `Add breakfast`,
    "price": 90
  }, {
    "title": `Laundry`,
    "price": 40
  }, {
    "title": `Order a meal from the restaurant`,
    "price": 180
  }]],
  [`sightseeing`],
  [`ship`, [{
    "title": `Choose meal`,
    "price": 160
  }, {
    "title": `Choose seats`,
    "price": 170
  }, {
    "title": `Upgrade to comfort class`,
    "price": 130
  }, {
    "title": `Upgrade to business class`,
    "price": 190
  }, {
    "title": `Add luggage`,
    "price": 170
  }, {
    "title": `Business lounge`,
    "price": 50
  }]],
  [`transport`],
  [`drive`, [{
    "title": `Choose comfort class`,
    "price": 30
  }, {
    "title": `Choose business class`,
    "price": 50
  }]],
  [`restaurant`, [{
    "title": `Choose live music`,
    "price": 100
  }, {
    "title": `Choose VIP area`,
    "price": 100
  }]],
]);
