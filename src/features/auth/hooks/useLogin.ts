import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import { updateMsgLogin } from "../../../stores/slices/msgLogin";
import { GET_TOKEN } from "../../../stores/slices/token";
import API from "../../../libs/api";
import Cookies from "js-cookie";

export function useLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            const response = await API.post(`/login`, form);
            Cookies.set("C.id", response.data.token, { expires: 7 });
            dispatch(GET_TOKEN(response.data.token));
            navigate("/");
        } catch (error: any) {
            dispatch(updateMsgLogin({ message: error.response.data.message }));
            setForm({
                username: "",
                password: "",
            });
        }
    }
    return {
        handleChange,
        login,
    };
}
