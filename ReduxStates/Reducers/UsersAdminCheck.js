const reducer = (state = "false", action) => {
  if ((action.type === "userAdminCheck")) {
    return state + action.payload;
  } else {
    return state;
  }
};

export default reducer;