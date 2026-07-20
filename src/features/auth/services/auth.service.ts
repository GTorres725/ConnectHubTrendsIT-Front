import { api } from "@/services/api";

type RegisterData = {
    name: string;
    email: string;
    password: string;
    sector: string;
}

type LoginData = {
    email: string;
    password: string;
}

export async function register(data: RegisterData) {
    const res = await api.post('auth/register', data);

    return res.data;
}

export async function login({email, password}: LoginData) {
    const res = await api.post('auth/login', {email, password})


    return res.data
}

export async function me() {
    const res = await api.post("/auth/me");

    return res.data;
}