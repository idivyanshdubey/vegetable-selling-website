import logo from '../assets/iconcontact.png';



function Login() {
  return (
  
<>
  <title>Orgo mart</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n    body {\n      font-family: Arial, sans-serif;\n      margin: 0;\n      padding: 0;\n    }\n    header {\n      background-color: #33a532;\n      padding: 0;\n      color: #fff;\n    }\n    h1 {\n      margin: 0;\n      font-size: 32px;\n    }\n    nav {\n      background-color: #f5f5f5;\n      padding: 10px;\n    }\n    nav ul {\n      list-style-type: none;\n      margin: 0;\n      padding: 0;\n    }\n    nav ul li {\n      display: inline;\n      margin-right: 10px;\n    }\n    nav ul li a {\n      color: #333;\n      text-decoration: none;\n      padding: 5px;\n    }\n    section {\n      padding: 20px;\n    }\n    \n    .login-form {\n      max-width: 350px;\n      margin: 20px auto;\n      padding: 20px;\n      background-color: #f5f5f5;\n      border: 1px solid #ccc;\n      display: flex;\n      justify-content: center;\n      margin-top: 50px;\n      background-image: url(login1.jpg);\n      background-size: contain;\n      border-radius: 65px;\n     color: white;\n    \n    }\n    .login-form input[type="text"],\n    .login-form input[type="password"] {\n      width: 100%;\n      padding: 10px;\n      margin-bottom: 10px;\n      border: 1px solid #ccc;\n    }\n    .login-form input[type="submit"] {\n      width: 100%;\n      padding: 10px;\n      background-color: #33a532;\n      border: none;\n      color: #fff;\n      cursor: pointer;\n    }\n\n  .heading{\n     text-align: center;\n     color: white;\n  }\n  p{\n    text-align: center;\n  }\n  a{\n    text-align: center;\n  }\n\n  .icon{\n    margin-top: 10px;\n  }\n  '
    }}
  />
  
 
  
  <div className="login-form">
    <form
      style={{ marginRight: 21 }}
      action="#"
      method="post"
      name="login"
      onsubmit="return validateForm()"
    >
      <h2 className="heading">Welcome to Green Grocer</h2>
      <br />
      <h2 className="heading">Login</h2>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" placeholder="Email id" required="" />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required=""
      />
      <br />
      <div style={{ marginLeft: 25 }}>
        <input type="submit" defaultValue="Sign in" />
      </div>
      <p>or</p>
      <div className="icon">
        <h2 className="heading">
          <a href="#">
            <img
              style={{ height: 20, width: 30, marginTop: 20 }}
              src="google.jpg"
            />
          </a>
         <p> Sign in with Google</p>
        </h2>
      </div>
      <p>New to Green Grocer?</p>
      <p>
        <a href="createacc.html">Create Account</a>
      </p>
    </form>
  </div>
</>
   
);
}

export default Login;