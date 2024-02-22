import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "../../../libs/api";
import { updateMsgRegister } from "../../../stores/slices/msgRegister";

export function useRegister() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const exp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

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
            const response = await api.post("/register", form);
            document.cookie = `C.id=${response.data.token};expires=${exp.toUTCString()};samesite=none;secure=false`;
            navigate("/");
        } catch (error: any) {
            dispatch(updateMsgRegister({ message: error.response.data.message }));
        }
    }
    return {
        handleChange,
        register,
    };
}
