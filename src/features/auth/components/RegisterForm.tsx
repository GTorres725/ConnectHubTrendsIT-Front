'use client'

import { useEffect, useState } from "react";
import { ButtonLogin } from "@/components/ButtonLogin";
import { InputForm } from "@/components/InputForm";
import { Sector } from "@/features/sector/types";
import { findAllSectors } from "@/features/sector/services/sector.service";
import { register } from "../services/auth.service";
import { useRouter } from "next/navigation";

export function RegisterForm() {
    const [sectors, setSectors] = useState<Sector[]>([])

    useEffect(() => {
        async function loadSectors() {
            try {
                const data = await findAllSectors();
                setSectors(data)
            } catch (_err) {
                console.log(_err);
            }
        }

        loadSectors();
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        sector: '',
    })

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const {accessToken} = await register(formData);

            localStorage.setItem("token", accessToken);

            router.push('/dashboard')
        } catch (_err) {
            alert(_err)
        }
    }

    return (
        <div>
            <h2>
                Bem vindo a empresa!
                <br />
                Cadastre-se aqui para realizar seu primeiro acesso ao Connect Hub
            </h2>

            <form onSubmit={handleSubmit}>
                <InputForm 
                    id="name"
                    name="name"
                    type="string"
                    label="Nome"
                    placeholder="Digite seu nome"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
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

                <label htmlFor="sector">Setor</label>
                <select
                className="rounded-lg border p-3"
                id="sector"
                value={formData.sector}
                onChange={e => setFormData({...formData, sector: e.target.value})}
                >
                    <option value="">
                    Selecione um setor
                    </option>
                    {sectors.map((i) => (
                        <option
                            key={i.id}
                            value={i.name}
                        >
                            {i.name}
                        </option>
                    ))
                    }
                </select>

                <ButtonLogin type="submit">
                    Registrar
                </ButtonLogin>
            </form>

        </div>
    )
}