// Description: Component to get one restaurant and its reviews

import React, { useState, useEffect, Suspense, lazy } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

import userImg  from "../img/userImg.png" // image by Smashicons from Flaticon

// import icons
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";

const IFrame = lazy(() => import("./iframe"));

const Restaurant = props => {
  const initialRestaurantState = { // create empty restaurant state
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => { // get restaurant from database
    RestaurantDataService.get(id)
      .then(res => {
        setRestaurant(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => { // use only when id changes
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => { // delete review from database
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(res => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return ( // display restaurant info
    <div style={{
      height: "100vh"
    }}>
      {restaurant ? (
        <div className="row">
          <div className="col-lg-8 bg-white rounded pt-2 px-2">
            <h3>{restaurant.name}</h3>
            <p>
              <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
              <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
            </p>

            <div>
              {/* The lazy component should then be rendered inside a Suspense component, which allows us to show some fallback
              content (such as a loading indicator) while we’re waiting for the lazy component to load */}
              {/* The fallback prop accepts any React elements that you want to render while waiting for the component to load */}
              <Suspense fallback={<div>Loading...</div>}>
                <IFrame src={`https://www.google.com/maps?q=${restaurant.address.building}${restaurant.address.street}${restaurant.address.zipcode}&output=embed`} width="100%" height="500px" />
              </Suspense>
            </div>

          </div>
          
          <div className="col-lg-4 bg-white rounded px-2">
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="h3">
                Reviews
              </div>
              <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-warning">
                Add Review
              </Link>
            </div>



            {restaurant.reviews.length > 0 ? ( 
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="py-1" key={index}>
                   <div className="card">

                      <div className="card-header d-flex align-items-end">
                        <div>
                          <img src={userImg} alt="user" /><br />
                        </div>
                        <div className="h3">
                          &nbsp; {review.name}
                        </div>
                        <div className="ms-auto">
                          <em>{review.date}</em>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                            "{review.text}"
                        </p>
                        {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <button onClick={() => deleteReview(review._id, index)} className="btn btn-danger col-lg-5 mx-1 mb-1">
                              <div className="d-flex justify-content-center align-items-center">
                                <div>Delete &nbsp;</div>
                                <RiDeleteBin6Line />
                              </div>
                            </button>
                            <Link to={{
                              pathname: "/restaurants/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">
                              <div className="d-flex justify-content-center align-items-center">
                                <div>Edit &nbsp;</div>
                                <FaEdit />
                              </div>

                            </Link>
                          </div>                   
                       }
                     </div>

                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}
          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
