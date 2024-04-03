import { useState } from "react";
import { useDispatch } from "react-redux";
import { GET_USERS } from "../stores/slices/users";
import API from "../libs/api";

export function useSearch() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    async function search() {
        const response = await API.get(`/search?name=${input}`);
        dispatch(GET_USERS({ data: response.data }));
    }

    return {
        input,
        setInput,
        search,
    };
}
