import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { ChangeEvent, useState } from "react";
import { postThread } from "../../../types/thread";
import { useDispatch } from "react-redux";
import { updateModal } from "../../../stores/slices/modal";
import { useNavigate } from "react-router-dom";
import { useThread } from "../../../hooks/useThread";
import API from "../../../libs/api";

export function usePost() {
    const user = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getThreads } = useThread();

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
            for (let i = 0; i < modal.image!.length; i++) {
                formData.append(`image${[[i]]}`, modal.image[i]);
            }
        }
        await API.post(`/thread`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        });
        // getThreads(user);
        dispatch(updateModal({ open: false }));
        navigate("/");
    }

    return {
        handleModal,
        postModal,
    };
}
