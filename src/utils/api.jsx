import axios from "axios";
export const api = axios.create({
  baseURL: "https://banco-mtb4.onrender.com/api/v1",
  headers: { "X-Custom-Header": "foobar" },
});
