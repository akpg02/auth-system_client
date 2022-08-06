import { axiosAuth } from "../actions/axios";
import { useEffect, useContext } from "react";
import { onAuthTokenChanged } from "../utils/firebase/firebase.utils";
import { GlobalContext } from "../context";
import { setCookie, destroyCookie } from "nookies";

const FirebaseAuthState = ({ children }) => {
  const { dispatch } = useContext(GlobalContext);

  // this component is responsible to keep the current user in context
  // then user info is accessible for the entire app
  // you can build protected routes etc based on that...
  useEffect(() => {
    return onAuthTokenChanged(async (user) => {
      if (!user) {
        dispatch({ type: "LOGOUT_USER" });
        destroyCookie(null, "token");
        setCookie(null, "token", "", {});
      } else {
        const { token } = await user.getIdTokenResult();
        destroyCookie(null, "token");
        setCookie(null, "token", token, {});

        const res = await axiosAuth.post(`/current-user`, {});
        dispatch({ type: "LOGIN_USER", payload: res.data });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        destroyCookie(null, "token");
        setCookie(null, "token", token, {});
        // get user info from backend, not firebase
        axiosAuth.post(`/current-user`).then((res) => {
          dispatch({
            type: "LOGIN_USER",
            payload: res.data,
          });
        });
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return <>{children}</>;
};

export default FirebaseAuthState;
