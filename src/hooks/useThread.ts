import { ChangeEvent, useState } from "react";
import api from "../libs/api";

export function useThread() {
    const [data, setData] = useState({
        content: "",
        image: null,
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target);
        const { name, value, files } = e.target;
        // console.log(files);
        if (files) {
            setData({
                ...data,
                [name]: files[0],
            });
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    }

    async function postThread(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
        e.preventDefault();
        try {
            const response = await api.post(`/thread`, data, {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                },
            });
            console.log("post", response);
            // dispatch(GET_THREADS({ data: response.data }));
            // navigate("/");
        } catch (error: any) {
            // dispatch(updateMsgLogin({ message: error.response.data.message }));
        }
    }
    return {
        handleChange,
        postThread,
    };
}
