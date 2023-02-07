// Description: Main component

import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./img/logo.png" // Logo image by Freepik from Flaticon
import background from "./img/background.jpg" // Background image by Pixabay from Pexels

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div style={{
      backgroundImage: `url(${background})`,
    }}>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <a href="/restaurants" className="navbar-brand">
          <img src={logo} alt="logo" className="me-2" />
          Restaurant Reviews
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/restaurants" className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <button onClick={logout} className="nav-link bg-transparent border-0" style={{cursor:'pointer'}}>
                Logout {user.name}
              </button>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
      <div>
        <footer className="footer mt-auto py-3 bg-dark">
          <div className="container text-center">
            <span className="text-muted">Restaurant Reviews by <a href="https://sethkerrey.com/">@sethkerrey</a></span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;