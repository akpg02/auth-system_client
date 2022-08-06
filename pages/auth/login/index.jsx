

const LoginForm = ({
  setLoginEmail,
  setLoginPassword,
  loginEmail,
  loginPassword,
  handleLogin,
}) => {
 
  return (
    <div className="col-md-6">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={loginEmail}
          className="form-control"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <small>We will never share your email</small>
      </div>
      <br />
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={loginPassword}
          className="form-control"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
      </div>
     
    </div>
  );
};

export default LoginForm;
