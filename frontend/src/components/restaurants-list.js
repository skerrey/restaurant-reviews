// Description: Component to get list of restaurants

import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

import { FiExternalLink } from "react-icons/fi"; // import icon

import Spinner from 'react-bootstrap/Spinner';

const RestaurantsList = props => {

  // State hooks
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  const [loading, setLoading] = useState(false); 

  useEffect(() => { 
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  }

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
        setLoading(true)
      })

      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(res => {
        console.log(res.data);
        setCuisines(["All Cuisines"].concat(res.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <div className="container pb-2">
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4 py-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4 pb-1">

          <select onChange={onChangeSearchCuisine}>
            {cuisines.map(cuisine => {
              return (
                <option value={cuisine}> {cuisine.substring(0, 21)} </option>
              )
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-dark ms-2"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        { /* Spinner for loading */
          loading ? retrieveRestaurants : 
          <div className=" d-flex justify-content-center align-items-center bg-white rounded">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="ps-2">
              <h3>Loading...</h3>
            </div>
          </div>
          }
        {restaurants.map((restaurant) => { // map restaurant building, street, zipcode to variable
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (

            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                    <Link to={"/restaurants/"+restaurant._id} className="btn btn-warning col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a target="_blank" 
                      rel="noreferrer" 
                      href={"https://www.google.com/maps/place/" + address} 
                      className="btn btn-primary col-lg-5 mx-1 mb-1">
                        View Map &nbsp;
                        <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default RestaurantsList;
