import { ChangeEvent, useState } from "react";
import api from "../libs/api";
import { useDispatch } from "react-redux";
import { GET_THREADS } from "../stores/slices/threads";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { GET_THREAD } from "../stores/slices/thread";
import { postThread, replyThread } from "../types/thread";
import { updateModal } from "../stores/slices/modal";
import { useNavigate } from "react-router-dom";

export function useThread() {
    const user = useSelector((state: RootState) => state.user.id);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState<postThread>({
        content: "",
        image: null,
    });

    const [modal, setModal] = useState<postThread>({
        content: "",
        image: null,
    });

    const [reply, setReply] = useState<replyThread>({
        content: "",
        image: null,
        author: 0,
    });

    function handleModal(e: ChangeEvent<HTMLInputElement>) {
        const { name, files, value } = e.target;
        if (files) {
            setModal({
                ...modal,
                [name]: files,
            });
        } else {
            setModal({
                ...modal,
                [name]: value,
            });
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, files, value } = e.target;
        if (files) {
            setForm({
                ...form,
                [name]: files,
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
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

    async function postModal(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", modal.content);
        if (modal.image) {
            for (let i = 0; i < modal.image!.length; i++) {
                formData.append(`image${[[i]]}`, modal.image[i]);
            }
        }
        await api.post(`/thread`, formData, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        });
        getThreads(user);
        dispatch(updateModal({ open: false }));
        navigate("/");
    }

    async function postThread(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", form.content);
        if (form.image) {
            for (let i = 0; i < form.image!.length; i++) {
                formData.append(`image${[[i]]}`, form.image[i]);
            }
        }
        await api.post(`/thread`, formData, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        getThreads(user);
    }

    async function postReply(id: number) {
        const formData = new FormData();
        formData.append("content", reply.content);
        formData.append("image", reply.image as File);
        formData.append("thread", id.toString());

        await api.post("/reply/thread", formData, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        getThread(id);
    }

    async function getThreads(id: number) {
        const response = await api.get(`/thread?id=${id}`);
        dispatch(GET_THREADS({ data: response.data }));
    }

    async function getThread(id: number) {
        const response = await api.get(`/thread/${id}?id=${user}`);
        dispatch(GET_THREAD(response.data));
    }

    async function deleteReply(replyId: number, threadId: number) {
        await api.delete(`/reply/${replyId}`, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        getThread(threadId);
    }

    async function likeThread(id: number) {
        await api.post(
            "/like/thread",
            { thread: id },
            {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                },
            }
        );
        getThread(id);
    }

    async function unlikeThread(id: number) {
        await api.delete(`/unlike/thread?id=${id}`, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        getThread(id);
    }

    async function likeReply(replyId: number, threadId: number) {
        await api.post(
            "like/reply",
            { reply: replyId },
            {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                },
            }
        );
        getThread(threadId);
    }

    async function unlikeReply(replyId: number, threadId: number) {
        await api.delete(`unlike/reply?id=${replyId}`, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        getThread(threadId);
    }

    async function like(id: number) {
        await api.post(
            "/like/thread",
            { thread: id },
            {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                },
            }
        );
        getThreads(user);
    }

    async function unlike(id: number) {
        await api.delete(`/unlike/thread?id=${id}`, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        getThreads(user);
    }

    return {
        getThreads,
        getThread,
        handleChange,
        handleModal,
        handleReply,
        postThread,
        postModal,
        like,
        unlike,
        likeThread,
        unlikeThread,
        likeReply,
        unlikeReply,
        postReply,
        deleteReply,
    };
}
