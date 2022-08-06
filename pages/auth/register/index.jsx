const Register = ({
  registerEmail,
  registerPassword,
  confirmRegisterPassword,
  setConfirmRegisterPassword,
  setRegisterEmail,
  setRegisterPassword,
  handleRegister,
}) => {
  return (
    <div className="col-md-6">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={registerEmail}
          className="form-control"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <small>We will never share your email</small>
      </div>
      <br />
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={registerPassword}
          className="form-control"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          value={confirmRegisterPassword}
          type="password"
          className="form-control"
          onChange={(e) => setConfirmRegisterPassword(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button onClick={handleRegister} className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
