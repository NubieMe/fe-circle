import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import API from "../libs/api";
import { updateMsgRegister } from "../stores/slices/msgRegister";
import { GET_TOKEN } from "../stores/slices/token";
import Cookies from "js-cookie";

export function useRegister() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function register(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const response = await API.post("/register", form);

            Cookies.set("C.id", response.data.token, { expires: 7 });
            dispatch(GET_TOKEN(response.data.token));
            window.location.href = "/";
        } catch (error: any) {
            dispatch(updateMsgRegister({ message: error.response.data.message }));
        }
    }
    return {
        handleChange,
        register,
    };
}
