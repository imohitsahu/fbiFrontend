import axios from "axios";

export default axios.create({
  baseURL: "https://find-best-instituteapp.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
}); 