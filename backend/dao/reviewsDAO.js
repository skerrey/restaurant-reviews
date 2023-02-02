// Description: Data Access Objects for reviews in restaurant DB

import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO { 
  static async injectDB(conn) { // See if reviews exist
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addReview(restaurantId, user, review, date) { // Add review to DB
    try {
      const reviewDoc = { 
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: new ObjectId(restaurantId),
      };

      return await reviews.insertOne(reviewDoc); // insert into DB 
    } catch (e) { 
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, text, date) { // Updates review in DB
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId)}, // look for review with correct ID's
        { $set: { text: text, date: date } }, // update text and date
      )

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) { // Deletes review from DB
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

}