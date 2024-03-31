import { useDispatch } from "react-redux";
import { updateUser } from "../../../stores/slices/user";
import API from "../../../libs/api";

export function useCurrent() {
    const dispatch = useDispatch();
    
    async function getCurrent() {
        const res = await API.get("/user/me/current");
        dispatch(updateUser(res.data));
    }

    return {
        getCurrent,
    };
}
