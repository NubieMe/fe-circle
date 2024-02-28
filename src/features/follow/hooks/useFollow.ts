import api from "../../../libs/api";

export function useFollow() {
    async function follow(id: number) {
        await api.post(
            `/follow`,
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

    async function unfollow(id: number) {
        await api.delete(`/unfollow/?follower=${id}`, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
    }

    return {
        follow,
        unfollow,
    };
}
