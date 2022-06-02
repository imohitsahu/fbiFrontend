import http from "./http-common";

class RatingService {

  create(rating) {
    return http.post(`/rating`, rating);
  }
  getAll() {
    return http.post(`/rating`);
  }
  get(insEmail) {
    return http.get(`/rating/${insEmail}`);
  }
}

export default new RatingService();