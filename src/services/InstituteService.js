import http from "./http-common";

class InstituteService {
  getAll() {
    return http.get(`/institute`);
  }

  get(id) {
    return http.get(`/institute/${id}`);
  }
  create(institute) {
    return http.post(`/institute`, institute);
  }
  update(email, institute) {
    return http.put(`/institute/${email}`, institute);
  }
  delete(email) {
    return http.delete(`/institute/${email}`);
  }
  changePassword(email, oldpassword, newpassword) {
    return http.put(`/${email}/${oldpassword}/${newpassword}`)
  }
}

export default new InstituteService();