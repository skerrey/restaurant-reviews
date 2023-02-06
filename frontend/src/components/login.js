// Description: Login component

import React, { useState } from "react";

const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => { // update user info from form
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user); // login user from App.js
    props.history.push('/'); // redirect to home page after login
  }

  return ( // login form
    <div className="submit-form w-50 mx-auto align-middle" style={{
      height: "100vh"
    }}>
      <div className="bg-white p-3 rounded">
        <div className="form-group h5">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group h5">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success mt-2">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
