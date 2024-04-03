import { useSelector } from "react-redux";
import API from "../libs/api";
import { RootState } from "../stores/store";
import { useDispatch } from "react-redux";
import { GET_FOLLOW } from "../stores/slices/follow";

export function useFollow() {
    const user = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();

    async function follow(id: number) {
        await API.post(`/follow`, {
            following: id,
        });
    }

    async function unfollow(id: number) {
        await API.delete(`/unfollow/?follower=${id}`);
    }

    async function getFollow() {
        const response = await API.get(`/follow`);
        dispatch(GET_FOLLOW(response.data));
    }

    return {
        follow,
        unfollow,
        getFollow,
    };
}
