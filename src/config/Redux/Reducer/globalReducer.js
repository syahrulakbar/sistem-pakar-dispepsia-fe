const initialState = {
  account: {},
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        account: action.payload,
      };

    default:
      return state;
  }
};
export default globalReducer;
