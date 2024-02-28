import { useState } from "react";
import api from "../../../libs/api";
import { useDispatch } from "react-redux";
import { GET_USERS } from "../../../stores/slices/users";

export function useSearch() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    async function search() {
        const response = await api.get(`/search?name=${input}`);
        dispatch(GET_USERS({ data: response.data }));
    }

    async function followSearch(id: number) {
        await api.post(
            "/follow",
            {
                following: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                },
            }
        );
        search();
    }

    async function unfollowSearch(id: number) {
        await api.delete(`/unfollow?follower=${id}`, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        search();
    }

    return {
        input,
        setInput,
        search,
        followSearch,
        unfollowSearch,
    };
}
