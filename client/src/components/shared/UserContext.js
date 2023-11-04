// UserContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.API_URL;

const UserContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isContextReady: false
};
// userReducer is a function that takes two arguments: state and action, defines how the state of user authentication and related data should change in response to different actions. It's typically used as a reducer function in conjunction with React's useReducer hook to manage state changes in a predictable manner.
// state represents the current state of user authentication and related data
// action is an object that describes the type of action to be performed
const userReducer = (state, action) => {
  switch (action.type) {
    // returns a new state object with two modifications i.e. user and
    case "LOGIN":
      return {
        ...state,
        user: action.user, // an object containing user data, like the user's name, email, or ID.
        isAuthenticated: true, //indicating that the user is authenticated
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
      case "CONTEXT_READY":
        return {
          ...state,
          isContextReady: true,
        };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  // It allows for custom state logic, keeping track of multiple pieces of state that rely on complex logic, useReducer may be useful.
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    // Check for user authentication on initial load (e.g., from local storage or a token)
    // If user data exists, dispatch 'LOGIN' action with the user information.
    // Otherwise, dispatch 'LOGOUT'.
    axios
      .get(`${API_URL}/user/check-auth`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          // Successful response, user is authenticated
          const user = response.data.user;
          dispatch({ type: "LOGIN", user });
        } else if (response.status === 401) {
          // Unauthorized, user is not authenticated
          dispatch({ type: "LOGOUT" });
        } else {
          // Handle other status codes as needed
          console.error("Unhandled status code:", response.status);
        }
        dispatch({ type: "CONTEXT_READY" });
      })
      .catch((error) => {
        dispatch({ type: "CONTEXT_READY" });
        // console.log(initialState.isContextReady)
        console.error("Error checking user authentication:", error);
        // Handle error as needed
      });
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

//custom hook to access the user context using the useContext hook.
// It returns the current context value, which includes state (the user-related data and authentication state) and dispatch (a function to dispatch actions to update the state).
export const useUser = () => {
  return useContext(UserContext);
};
