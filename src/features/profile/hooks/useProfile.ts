import { useDispatch } from "react-redux";
import { GET_PROFILE } from "../../../stores/slices/userProfile";
import api from "../../../libs/api";

export function useProfile() {
    const dispatch = useDispatch();

    async function getUser(username: string) {
        const response = await api.get(`/user/${username}`);
        dispatch(GET_PROFILE(response.data));
    }

    async function likeProfile(id: number, username: string) {
        await api.post(
            "/like/thread",
            { thread: id },
            {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                },
            }
        );
        getUser(username);
    }

    async function unlikeProfile(id: number, username: string) {
        await api.delete(`/unlike/thread?id=${id}`, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        getUser(username);
    }

    return {
        getUser,
        likeProfile,
        unlikeProfile,
    };
}
