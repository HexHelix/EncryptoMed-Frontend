import "../index.css";
import "./login.css";

const Loginf = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  return (
    <section className="login">
    
    
      <div className="loginContainer">
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <div>
              <button onClick={handleLogin}>Login</button>
              <p>
                Don't have account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up!</span>{" "}
              </p>
            </div>
          ) : (
            <div>
              <button onClick={handleSignup}>Sign up</button>
              <p>
                Already have account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>
                  Login here!
                </span>{" "}
              </p>
            </div>
          )}
        </div>
      </div>

      
      
    </section>
    
  );
};

export default Loginf;
