import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../context";
import { signOutUser } from "../utils/firebase/firebase.utils";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(GlobalContext);

  const handleLogout = async () => {
    await signOutUser();
    dispatch({ type: "LOGOUT_USER" });
    router.push("/auth");
  };

  return (
    <nav className="nav bg-light d-flex justify-content-between">
      <Link href="/">
        <a className="">Home</a>
      </Link>
      <Link href={user ? "/hotel/new" : "/auth"}>
        <a className="">Submit Hotel</a>
      </Link>
      {user ? (
        <a onClick={handleLogout} className="nav-link">
          Logout
        </a>
      ) : (
        <Link href="/auth">
          <a>Login</a>
        </Link>
      )}
    </nav>
  );
};
export default Nav;
