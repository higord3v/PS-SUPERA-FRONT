import axios from "axios";
export const api = axios.create({
  // baseURL:
  //   import.meta.env.MODE === "development"
  //     ? "http://localhost:8080/api/v1"
  //     : "https://banco-mtb4.onrender.com/api/v1",
  baseURL: "https://banco-mtb4.onrender.com/api/v1",
  headers: { "X-Custom-Header": "foobar" },
});
