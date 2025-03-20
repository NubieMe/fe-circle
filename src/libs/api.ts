import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "https://modern-honeybee-romantic.ngrok-free.app/api/",
    headers: {
        Accept: "application/json",
        Authorization: Cookies.get("C.id") ? "Bearer " + Cookies.get("C.id") : "",
        "ngrok-skip-browser-warning": true,
    },
});

export default API;
