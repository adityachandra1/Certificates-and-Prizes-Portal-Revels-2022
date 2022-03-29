import axios from "axios";

// create basic axios config
const axiosConfig = {
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCreditentials: true,
};

export default axios.create(axiosConfig);
