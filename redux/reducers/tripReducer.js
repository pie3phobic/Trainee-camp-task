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
      return {
        ...state,
        trips: [...state.trips, action.payload],
      };
    // Add other cases for removing, updating trips if needed
    default:
      return state;
  }
};

export default tripsReducer;
