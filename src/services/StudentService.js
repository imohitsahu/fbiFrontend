import http from "./http-common";

class StudentService {
  getAll() {
    return http.get("/student");
  }

  get(email) {
    return http.get(`/student/${email}`);
  }
  create(student) {
    return http.post("/student", student);
  }
  update(email, student) {
    return http.put(`/student/${email}`, student);
  }
  delete(email) {
    return http.delete(`/student/${email}`);
  }
  changePassword(email, oldpassword, newpassword) {
    return http.put(`/student/${email}/${oldpassword}/${newpassword}`)
  }
}

export default new StudentService();