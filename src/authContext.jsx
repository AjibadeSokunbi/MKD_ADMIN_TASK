import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";
import { useNavigate } from "react-router";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { token, role, user_id } = action.payload;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", user_id);

      return {
        ...state,
        isAuthenticated: true,
        token: token,
        role: role,
        user: {
          id: user_id,
        },
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT", 
    });
    navigate("/" + role + "/login");
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const checkToken = async () => {
      try {

        await sdk.check(state.role);
      } catch (error) {

        tokenExpireError(dispatch, "TOKEN_EXPIRED");
      }
    };


    checkToken();
  }, [state.role]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
