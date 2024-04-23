import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL:
        "https://railway.app/project/2b7f01e1-2039-4009-ab5e-a1ae2cc6069f/service/a0627719-16f8-4da7-b5a9-81982c48bb9c/:5000/api/v1",
    headers: {
        Accept: "application/json",
        Authorization: Cookies.get("C.id") ? "Bearer " + Cookies.get("C.id") : "",
    },
});

export default API;
