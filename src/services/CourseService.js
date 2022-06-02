import http from "./http-common";

class CourseService {

  get(insEmail) {
    return http.get(`/course/${insEmail}`);
  }
  create(course) {
    return http.post(`/course`, course);
  }
  delete(id) {
    return http.delete(`/course/${id}`);
  }
}

export default new CourseService();