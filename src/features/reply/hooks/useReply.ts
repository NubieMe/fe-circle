import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { ChangeEvent, useState } from "react";
import { replyThread } from "../../../types/thread";
import { useDispatch } from "react-redux";
import { GET_THREAD } from "../../../stores/slices/thread";
import API from "../../../libs/api";

export function useReply() {
    const user = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();
    // const { api, APIwT } = useAPI();

    const [reply, setReply] = useState<replyThread>({
        content: "",
        image: null,
        author: 0,
    });

    async function getThread(id: number) {
        const response = await API.get(`/thread/${id}?id=${user}`);
        dispatch(GET_THREAD(response.data));
    }

    function handleReply(e: ChangeEvent<HTMLInputElement>) {
        const { name, files, value } = e.target;
        if (files) {
            setReply({
                ...reply,
                [name]: files[0],
            });
        } else {
            setReply({
                ...reply,
                [name]: value,
            });
        }
    }

    async function postReply(id: number) {
        const formData = new FormData();
        formData.append("content", reply.content);
        formData.append("image", reply.image as File);
        formData.append("thread", id.toString());

        await API.post("/reply/thread", formData);
        getThread(id);
    }

    async function deleteReply(replyId: number, threadId: number) {
        await API.delete(`/reply/${replyId}`);
        getThread(threadId);
    }

    async function likeThread(id: number) {
        await API.post("/like/thread", { thread: id });
        getThread(id);
    }

    async function unlikeThread(id: number) {
        await API.delete(`/unlike/thread?id=${id}`);
        getThread(id);
    }

    async function likeReply(replyId: number, threadId: number) {
        await API.post("like/reply", { reply: replyId });
        getThread(threadId);
    }

    async function unlikeReply(replyId: number, threadId: number) {
        await API.delete(`unlike/reply?id=${replyId}`);
        getThread(threadId);
    }

    return {
        getThread,
        handleReply,
        postReply,
        deleteReply,
        likeThread,
        unlikeThread,
        likeReply,
        unlikeReply,
    };
}
