import { useDispatch } from "react-redux";
import { GET_PROFILE } from "../../../stores/slices/userProfile";
import API from "../../../libs/api";

export function useProfile() {
    const dispatch = useDispatch();

    async function getUser(username: string) {
        const response = await API.get(`/user/${username}`);
        dispatch(GET_PROFILE(response.data));
    }

    async function likeProfile(id: number, username: string) {
        await API.post("/like/thread", { thread: id });
        getUser(username);
    }

    async function unlikeProfile(id: number, username: string) {
        await API.delete(`/unlike/thread?id=${id}`);
        getUser(username);
    }

    return {
        getUser,
        likeProfile,
        unlikeProfile,
    };
}
