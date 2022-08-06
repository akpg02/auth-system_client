import { useContext } from "react";
import { GlobalContext } from "../context";

const Home = () => {
  const { state } = useContext(GlobalContext);
  return (
    <div className="container">
      <h2>Home page</h2>
      <p className="lead">
        This page is for public view. Anyone can access it. If you log in you
        can see your details here.
      </p>
      <pre> {JSON.stringify(state, null, 4)}</pre>
    </div>
  );
};

export default Home;
