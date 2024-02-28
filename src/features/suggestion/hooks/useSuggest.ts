import api from "../../../libs/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useDispatch } from "react-redux";
import { GET_SUGGEST } from "../../../stores/slices/suggestion";

export function useSuggest() {
    const user = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();

    async function getSuggest() {
        const response = await api.get(`/suggestion?id=${user}`);
        console.log(response);
        dispatch(GET_SUGGEST({ data: response.data }));
    }

    async function followSuggest(id: number) {
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
    }

    return {
        getSuggest,
        followSuggest,
    };
}
