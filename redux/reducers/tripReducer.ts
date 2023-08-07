const initialState = {
  trips: [
    {
      city: "London",
      startDate: "2023-08-19",
      endDate: "2023-08-21",
      imageUrl:
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
  ],
};

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TRIP":
      const updatedTrips = [...state.trips, action.payload];
      updatedTrips.sort((a, b) => {
        //@ts-ignore
        return new Date(a.startDate) - new Date(b.startDate);
      });

      return {
        ...state,
        trips: updatedTrips,
      };
    default:
      return state;
  }
};

export default tripsReducer;
