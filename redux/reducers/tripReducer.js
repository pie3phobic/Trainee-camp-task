const initialState = {
  trips: [
    {
      city: "London",
      startDate: "2023-08-10",
      endDate: "2023-08-15",
      imageUrl: "https://links.papareact.com/5j2",
    },
  ],
};

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TRIP":
      // Add the new trip to the trips array
      const updatedTrips = [...state.trips, action.payload];

      // Sort the updated trips array based on start dates
      updatedTrips.sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });

      return {
        ...state,
        trips: updatedTrips,
      };
    // Add other cases for removing, updating trips if needed
    default:
      return state;
  }
};

export default tripsReducer;
