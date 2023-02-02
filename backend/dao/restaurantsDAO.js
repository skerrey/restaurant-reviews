// Description: Data Access Objects for restaurants DB

import mongodb from "mongodb"; 

const ObjectId = mongodb.ObjectId;

let restaurants;

export default class RestaurantsDAO { // Class for restaurants DAO
  static async injectDB(conn) { // Connect to restaurants DB
    if (restaurants) {
      return
    }
    try {
      restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }

  static async getRestaurants({ // Call restaurants
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) { // If filters are provided
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor;

    try { // Find restaurants in DB from query
      cursor = await restaurants
        .find(query)
    } catch (e) { // If error, return empty list
      console.error(`Unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0};
    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page); // Limit and skip restaurants

    try { // Convert total amount of restaurants (cursor) to array
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants =  await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  static async getRestaurantByID(id) { // Get restaurant by ID
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ]
      return await restaurants.aggregate(pipeline).next(); // Returns restaurants with reviews connected
    } catch (e) {
      console.error(`Something went wrong in getRestaurantById: ${e}`);
      throw e;
    }
  }

  static async getCuisines() { // Get cuisines
    let cuisines = [];
    try {
      cuisines = await restaurants.distinct("cuisine"); // Get one of each cuisine 
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines
    }
  }

}