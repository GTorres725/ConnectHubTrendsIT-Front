import { ButtonLogin } from "@/components/ButtonLogin";
import { InputForm } from "@/components/InputForm";
import { useState } from "react";
import { login } from "../services/auth.service";
import { useRouter } from "next/navigation";

export function LoginForm() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const {accessToken} = await login(formData);

            localStorage.setItem("token", accessToken);

            router.push('/dashboard')
        } catch (_err) {
            alert(_err)
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <InputForm
                    id="email"
                    type="email"
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />

                <InputForm
                    id="password"
                    type="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />

                <ButtonLogin type="submit">
                    Entrar
                </ButtonLogin>
            </form>

        </div>
    )
}