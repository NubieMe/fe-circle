import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "http://3.106.220.128:5000/api/",
    headers: {
        Accept: "application/json",
        Authorization: Cookies.get("C.id") ? "Bearer " + Cookies.get("C.id") : "",
        "ngrok-skip-browser-warning": true,
    },
});

export default API;
