import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/nav.component";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalProvider } from "../context";

import FirebaseAuthState from "../components/firebaseAuthState";

import "antd/dist/antd.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalProvider>
        <FirebaseAuthState>
          <div className="container">
            <Nav />
          </div>
          <ToastContainer />
          <Component {...pageProps} />
        </FirebaseAuthState>
      </GlobalProvider>
    </>
  );
};

export default MyApp;
