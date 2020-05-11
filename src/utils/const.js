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
