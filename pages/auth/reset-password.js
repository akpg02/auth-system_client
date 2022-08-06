import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context";
import { forgotPasswordLinkInEmail } from "../../utils/firebase/firebase.utils";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_API_PASSWORD_RESET_REDIRECT,
      handleCodeInApp: true,
    };
    try {
      await forgotPasswordLinkInEmail(email, config);
      setEmail("");
      setLoading(false);
      toast.info("Check your email for the password reset link.");
    } catch (error) {
      setEmail("");
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <h2>Reset Password</h2>
      <p className="lead">
        If you have already registered, you can enter your email address to
        receive a password reset link.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoFocus
        />
        <button className="btn btn-primary mt-4" disabled={!email || loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
