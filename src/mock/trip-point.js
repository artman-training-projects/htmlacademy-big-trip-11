const tripPointTypes = {
  transport: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  place: [`Check`, `Sightseeing`, `Restaurant`],
};

const tripDestinationCitys = [`Amsterdam`, `Geneva`, `Melbourne`, `Chamonix`, `Saint Petersburg`, `Frankfurt`, `Lisbon`, `Sochi`, `Barcelona`, `Helsinki`, `Oslo`, `Moscow`, `Kioto`, `Tokyo`];

const tripTime = {
  from: 10,
  to: 12,
};

const tripPointOptions = [{
  title: `title`,
  price: 20,
}, {
  title: `title`,
  price: 40,
}, {
  title: `title`,
  price: 60,
}, {
  title: `title`,
  price: 80,
}, {
  title: `title`,
  price: 100,
}];

const tripDestinationDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const tripDestinationPhotos = `http://picsum.photos/248/152?r=${Math.random()}`;

const generateTripPoint = () => {
  return {
    type,
    destination: {
      title,
      description,
      photos,
    },
    options,
  };
};

export {generateTripPoint};
