import { ChangeEvent, useState } from "react";
import { postThread } from "../types/thread";
import API from "../libs/api";
import { useAppDispatch } from "../stores/hooks";
import { fetchThreads } from "../stores/slices/threads";
import { useToast } from "@chakra-ui/react";

export function useThread() {
    const dispatch = useAppDispatch();
    const toast = useToast();

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
        const promise = new Promise(async (res, rej) => {
            try {
                const formData = new FormData();
                formData.append("content", form.content);
                if (form.image) {
                    let i = 0;
                    const len = form.image!.length;
                    for (i; i < len; i++) {
                        formData.append(`image${[[i]]}`, form.image[i]);
                    }
                }
                await API.post(`/thread`, formData);
                setForm({
                    content: "",
                    image: null,
                });
                dispatch(fetchThreads());
                res("ok");
            } catch (error) {
                rej();
            }
        });
        toast.promise(promise, {
            success: { title: "Success", description: "post thread success!" },
            error: { title: "Error", description: "post thread failed!" },
            loading: { title: "Please wait", description: "posting thread..." },
        });
    }

    async function like(id: number) {
        await API.post("/like/thread", { thread: id });
    }

    async function unlike(id: number) {
        await API.delete(`/unlike/thread?id=${id}`);
    }

    async function deleteThread(id: Number) {
        const promise = new Promise(async (res, rej) => {
            try {
                await API.delete(`/thread/${id}`);
                dispatch(fetchThreads());
                res("ok");
            } catch (error) {
                rej();
            }
        });
        toast.promise(promise, {
            success: { title: "Success", description: "delete thread success!" },
            error: { title: "Error", description: "delete thread failed!" },
            loading: { title: "Please wait", description: "deleting thread..." },
        });
    }

    return {
        form,
        handleChange,
        postThread,
        like,
        unlike,
        deleteThread,
    };
}
