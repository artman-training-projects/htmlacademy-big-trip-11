export const sortEvents = (events, sorting = `days`) => {
  let sortingEvents;

  switch (sorting) {
    case `days`:
      sortingEvents = events
        .slice()
        .sort((a, b) => Date.parse(a.dateFrom) - Date.parse(b.dateFrom));
      break;
  }

  return sortingEvents;
};
