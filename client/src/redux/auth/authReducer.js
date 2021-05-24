const initialState = {
  isLoading: false,
  user: {},
  authenticated: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        isLoading: false,
        user: action.payload,
        authenticated: true,
        error: '',
      };
    case 'LOGIN_FAILURE':
      return {
        isLoading: false,
        user: {},
        authenticated: false,
        error: action.payload,
      };
    case 'SAVE_TOKEN':
      return {
        isLoading: false,
        user: action.payload,
        authenticated: true,
        error: '',
      };
    case 'LOGOUT':
      return {
        isLoading: false,
        user: {},
        authenticated: false,
      };
    default:
      return state;
  }
};
export default reducer;
