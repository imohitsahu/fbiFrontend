import http from "./http-common";

class LoginService {
  login(loginDto) {
    return http.put(`/login`, loginDto);
  }
  logout(logoutDto) {
    return http.put(`/logout`, logoutDto);
  }
  getAdmin() {
    return http.get(`/responseadmin`, { withCredentials: true })
  }
  getStudent() {
    return http.get(`/responsestudent`, { withCredentials: true })
  }
  getInstitute() {
    return http.get(`/responseinstitute`, { withCredentials: true })
  }

  forgetpassword(email) {
    return http.get(`/${email}`);
  }

}
export default new LoginService();