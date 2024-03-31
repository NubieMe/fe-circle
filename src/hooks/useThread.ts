import { ChangeEvent, useState } from "react";
import { postThread } from "../types/thread";
import API from "../libs/api";
import { useAppDispatch } from "../stores/hooks";
import { fetchThreads } from "../stores/slices/threads";

export function useThread() {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<postThread>({
        content: "",
        image: null,
    });

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

    async function postThread(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", form.content);
        if (form.image) {
            for (let i = 0; i < form.image!.length; i++) {
                formData.append(`image${[[i]]}`, form.image[i]);
            }
        }
        await API.post(`/thread`, formData);
        setForm({
            content: "",
            image: null,
        });
        dispatch(fetchThreads());
    }

    async function like(id: number) {
        await API.post("/like/thread", { thread: id });
    }

    async function unlike(id: number) {
        await API.delete(`/unlike/thread?id=${id}`);
    }

    async function deleteThread(id: Number) {
        await API.delete(`/thread/${id}`);
        dispatch(fetchThreads());
    }

    return {
        handleChange,
        postThread,
        like,
        unlike,
        deleteThread,
    };
}
