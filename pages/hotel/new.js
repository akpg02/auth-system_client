import { parseCookies } from "nookies";
import axios from "axios";

const New = () => {
  return (
    <div className="container mt-5">
      <h2>Post a new hotel for booking</h2>
      <p className="lead">This is a protected page for logged in users only</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context);
    const res = await axios.get(`${process.env.REACT_APP_API}/private-route`, {
      headers: {
        token: cookies.token,
      },
    });
    if (res.data.ok) return { props: {} };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: {},
    };
  }
}

export default New;
