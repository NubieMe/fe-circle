import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "../../../libs/api";
import { updateMsgLogin } from "../../../stores/slices/msgLogin";

export function useLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const exp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await api.post(`/login`, form);
            document.cookie = `C.id=${response.data.token};expires=${exp.toUTCString()};samesite=none;secure=false`;
            navigate("/");
        } catch (error: any) {
            dispatch(updateMsgLogin({ message: error.response.data.message }));
        }
    }
    return {
        handleChange,
        login,
    };
}
