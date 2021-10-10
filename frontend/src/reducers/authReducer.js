export const REQUEST_LOGIN = '@@auth/REQUEST_LOGIN';
export const REQUEST_LOGIN_FAILURE = '@@auth/REQUEST_LOGIN_FAILURE';
export const REQUEST_LOGIN_SUCCESS = '@@auth/REQUEST_LOGIN_SUCCESS';
export const SAVE_ACCESS_TOKEN_IN_STORE = '@@auth/SAVE_ACCESS_TOKEN_IN_STORE';
export const REQUEST_LOG_USER_OUT = '@@auth/REQUEST_LOG_USER_OUT';
export const FETCHING_USER_FROM_TOKEN = '@@auth/FETCHING_USER_FROM_TOKEN';
export const FETCHING_USER_FROM_TOKEN_SUCCESS = '@@auth/FETCHING_USER_FROM_TOKEN_SUCCESS';
export const FETCHING_USER_FROM_TOKEN_FAILURE = '@@auth/FETCHING_USER_FROM_TOKEN_FAILURE';
export const REQUEST_USER_SIGN_UP = '@@auth/REQUEST_USER_SIGN_UP';
export const REQUEST_USER_SIGN_UP_SUCCESS = '@@auth/REQUEST_USER_SIGN_UP_SUCCESS';
export const REQUEST_USER_SIGN_UP_FAILURE = '@@auth/REQUEST_USER_SIGN_UP_FAILURE';

// Initial Auth State
export const initialState = {
  isLoading: false,
  error: false,
  user: {},
  accessToken: null,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        user: {},
      };
    case REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case SAVE_ACCESS_TOKEN_IN_STORE:
      return {
        ...state,
        accessToken: action.data,
      };
    case REQUEST_LOG_USER_OUT:
      return {
        ...initialState,
      };
    case FETCHING_USER_FROM_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHING_USER_FROM_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userLoaded: true,
        isLoading: false,
        user: action.data,
      };
    case FETCHING_USER_FROM_TOKEN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        userLoaded: true,
        isLoading: false,
        error: action.error,
        accessToken: null,
        user: {},
      };
    case REQUEST_USER_SIGN_UP:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case REQUEST_USER_SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.error,
      };
    default:
      return state;
  }
}
