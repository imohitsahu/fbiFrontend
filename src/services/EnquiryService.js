import http from "./http-common";

class EnquiryService {
  getAll() {
    return http.get(`/enquiry`)
  }
  getByInsEmail(insEmail) {
    return http.get(`/enquiry/insenq/${insEmail}`);
  }
  getByStuEmail(stuEmail) {
    return http.get(`/enquiry/stuenq/${stuEmail}`);
  }
  create(course) {
    return http.post(`/enquiry`, course);
  }
  delete(id) {
    return http.delete(`/enquiry/${id}`);
  }
}

export default new EnquiryService();