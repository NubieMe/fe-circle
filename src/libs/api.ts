import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "https://stage-connections-flash-gorgeous.trycloudflare.com/api/v1",
    headers: {
        Accept: "application/json",
        Authorization: Cookies.get("C.id") ? "Bearer " + Cookies.get("C.id") : "",
        "ngrok-skip-browser-warning": true,
    },
});

export default API;
