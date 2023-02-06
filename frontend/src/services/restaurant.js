// Description: Create API calls 

import http from "../http-common";
import { BASE_URL } from "./helper";

class RestaurantDataService {
  getAll(page = 0) { // Default page is 0
    return http.get(`${BASE_URL}/?page=${page}`);
  }

  get(id) {
    return http.get(`${BASE_URL}/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`${BASE_URL}/?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return http.post(`${BASE_URL}/review`, data);
  }

  updateReview(data) {
    return http.put(`${BASE_URL}/review`, data);
  }

  deleteReview(id, userId) {
    return http.delete(`${BASE_URL}/review?id=${id}`, { data: { user_id: userId } });
  }

  getCuisines(id) {
    return http.get(`${BASE_URL}/cuisines`);
  }

}

export default new RestaurantDataService();