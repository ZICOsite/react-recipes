import axios from "axios";

const axiosInstanse = axios.create({
  baseURL: "https://dummyjson.com/recipes",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstanse;
