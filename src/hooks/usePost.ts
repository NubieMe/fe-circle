import { ChangeEvent, useState } from "react";
import { postThread } from "../types/thread";
import { updateModal } from "../stores/slices/modal";
import { useNavigate } from "react-router-dom";
import API from "../libs/api";
import { useAppDispatch } from "../stores/hooks";
import { fetchThreads } from "../stores/slices/threads";

export function usePost() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [modal, setModal] = useState<postThread>({
        content: "",
        image: null,
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

    async function postModal(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", modal.content);
        if (modal.image) {
            let i = 0;
            const len = modal.image!.length;
            for (i; i < len; i++) {
                formData.append(`image${[[i]]}`, modal.image[i]);
            }
        }
        await API.post(`/thread`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        dispatch(updateModal({ open: false }));
        dispatch(fetchThreads());
        navigate("/");
    }

    return {
        handleModal,
        postModal,
    };
}
