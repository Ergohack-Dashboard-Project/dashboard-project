import { useRouter } from 'next/router';
import { createContext, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import authReducer, {
  initialState,
  //TYPES
  FETCHING_USER_FROM_TOKEN,
  FETCHING_USER_FROM_TOKEN_FAILURE,
  FETCHING_USER_FROM_TOKEN_SUCCESS,
  REQUEST_LOGIN,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOG_USER_OUT,
  REQUEST_USER_SIGN_UP,
  REQUEST_USER_SIGN_UP_FAILURE,
  REQUEST_USER_SIGN_UP_SUCCESS,
  SAVE_ACCESS_TOKEN_IN_STORE,
} from './reducers/authReducer';

const authContext = createContext();

// Auth Provider
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Utility hook to use Auth
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  const requestUserLogin = async ({ email, password }) => {
    // set state to loading while we wait for server response
    dispatch({ type: REQUEST_LOGIN });

    // create the url-encoded form data
    const formData = new FormData();
    formData.set('username', email);
    formData.set('password', password);

    // set the request headers
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      // make the actual HTTP request to our API
      const res = await axios({
        method: `POST`,
        url: `http://localhost:8000/api/users/login/token/`,
        data: formData,
        headers,
      });
      console.log(res);
      // stash the access_token our server returns
      const access_token = res?.data?.access_token;
      localStorage.setItem('access_token', access_token);

      // save the token in the store.
      dispatch({ type: SAVE_ACCESS_TOKEN_IN_STORE, data: access_token });

      // dispatch the success action
      dispatch({ type: REQUEST_LOGIN_SUCCESS });

      // dispatch the fetch user from token
      return await fetchUserFromToken(access_token);
    } catch (error) {
      console.log(error);
      // dispatch the failure action
      return dispatch({ type: REQUEST_LOGIN_FAILURE, error: error?.message });
    }
  };

  const fetchUserFromToken = async (access_token) => {
    dispatch({ type: FETCHING_USER_FROM_TOKEN });
    const token = access_token ?? null;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios({
        method: `GET`,
        url: `http://localhost:8000/api/users/me/`,
        headers,
      });
      console.log(res);

      dispatch({ type: FETCHING_USER_FROM_TOKEN_SUCCESS, data: res.data });
      return { success: true };
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCHING_USER_FROM_TOKEN_FAILURE, error });
      return { success: false, error: error };
    }
  };

  // When calling registerNewUser, pass state argument so that we have access to token (if present).
  const registerNewUser = async ({ username, email, password }) => {
    await apiClient(
      {
        url: `/users/`,
        method: `POST`,
        types: {
          REQUEST: REQUEST_USER_SIGN_UP,
          SUCCESS: REQUEST_USER_SIGN_UP_SUCCESS,
          FAILURE: REQUEST_USER_SIGN_UP_FAILURE,
        },
        options: {
          data: { new_user: { username, email, password } },
          params: {},
        },
        onSuccess: (res) => {
          // stash the access_token our server returns
          const access_token = res?.data?.access_token?.access_token;
          localStorage.setItem('access_token', access_token);

          // save the token in the store.
          dispatch({ type: SAVE_ACCESS_TOKEN_IN_STORE, data: access_token });
          return dispatch(fetchUserFromToken(access_token));
        },
        onFailure: (res) => ({
          type: res.type,
          success: false,
          status: res.status,
          error: res.error,
        }),
      },
      dispatch
    );
  };

  const logUserOut = () => {
    localStorage.removeItem('access_token');
    dispatch({ type: REQUEST_LOG_USER_OUT });
  };

  return {
    authState: state,
    actions: { requestUserLogin, registerNewUser, logUserOut, fetchUserFromToken },
    dispatch,
  };
}
