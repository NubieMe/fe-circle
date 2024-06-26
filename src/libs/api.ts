import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "https://be-circle-production.up.railway.app/api/v1",
    headers: {
        Accept: "application/json",
        Authorization: Cookies.get("C.id") ? "Bearer " + Cookies.get("C.id") : "",
    },
});

export default API;
