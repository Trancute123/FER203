export const steps = ["About", "Account", "Address"];
export const initialState = {
  step: 0,
  about: { firstName: "", lastName: "", email: "", avatarUrl: "", age: "" },
  account: { username: "", password: "", confirm: "", question: "", answer: "" },
  address: { streetName: "", streetNumber: "", city: "", country: "" },
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.section]: { ...state[action.section], [action.field]: action.value } };
    case "SET_AVATAR":
      return { ...state, about: { ...state.about, avatarUrl: action.url } };
    case "NEXT":
      return { ...state, step: Math.min(state.step + 1, steps.length - 1) };
    case "PREV":
      return { ...state, step: Math.max(state.step - 1, 0) };
    case "GOTO":
      return { ...state, step: action.index };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
  