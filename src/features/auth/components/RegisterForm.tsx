'use client'

import { useEffect, useState } from "react";
import { ButtonLogin } from "@/components/ButtonSubmit";
import { InputForm } from "@/components/InputForm";
import { Sector } from "@/features/sector/types";
import { findAllSectors } from "@/features/sector/services/sector.service";
import { register } from "../services/auth.service";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoadingComponent } from "@/components/LoadingComponent";

export function RegisterForm() {
    const [sectors, setSectors] = useState<Sector[]>([])

    //boolean loading component
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSectors() {
            try {
                setLoading(true)
                const data = await findAllSectors();
                setSectors(data)
            } catch (_err) {
                if (axios.isAxiosError(_err)) {
                  alert(_err.response?.data);
                } else {
                    alert(_err);
                }
            } finally {
                setLoading(false);
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
            setLoading(true)

            const {accessToken} = await register(formData);

            localStorage.setItem("token", accessToken);

            router.push('/dashboard')
        } catch (_err) {
            if (axios.isAxiosError(_err)) {
              alert(_err.response?.data);
            } else {
                alert(_err);
            }
        }
    }

    if(loading) {
        return (
            <LoadingComponent message="Conectando ao servidor... Isso pode levar até 1 minuto devido a hospedagem."/>
        )
    } else {
    return (
        <div className="bg-black text-white w-full">
            <div className=" flex flex-col px-5 text-center gap-2 mb-5">
                <h3 className="text-xl">Bem vindo a empresa!</h3>
                <p className="text-gray-500">Cadastre-se aqui para realizar seu primeiro acesso ao Connect Hub</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center content-center gap-3 px-10">
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

                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="sector">Setor</label>
                    <select
                    className="rounded-lg border p-3 focus:border-blue-500"
                    id="sector"
                    value={formData.sector}
                    onChange={e => setFormData({...formData, sector: e.target.value})}
                    >
                        <option value="" className="bg-black">
                        Selecione um setor
                        </option>
                        {sectors.map((i) => (
                            <option className="bg-black"
                                key={i.id}
                                value={i.name}
                            >
                                {i.name}
                            </option>
                        ))
                        }
                    </select>
                </div>

                <ButtonLogin type="submit">
                    Registrar
                </ButtonLogin>
            </form>

        </div>
    )
    }
}