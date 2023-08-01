export const addTrip = (trip) => {
  return {
    type: "ADD_TRIP",
    payload: trip,
  };
};
// Add other action creators for removing, updating trips if needed
