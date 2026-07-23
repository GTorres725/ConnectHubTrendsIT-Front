'use client'

import { useEffect, useState } from "react";
import { InputForm } from "@/components/InputForm";
import { Sector } from "@/features/sector/types";
import { findAllSectors } from "@/features/sector/services/sector.service";
import { addTicket } from "../ticket.service";
import { ButtonLogin } from "@/components/ButtonSubmit";
import axios from "axios";
import { LoadingComponent } from "@/components/LoadingComponent";

export function AddTicketComponent() {
    //boolean loading component
    const [loading, setLoading] = useState(true);

    const [sectors, setSectors] = useState<Sector[]>([])

    //mensagem loading
    const [message, setMessage] = useState('')

    useEffect(() => {
        async function loadSectors() {
            try {
                setLoading(true);
                setMessage('Carregando...');
                const data = await findAllSectors();
                setSectors(data);
            } catch (_err) {
                if (axios.isAxiosError(_err)) {
                  alert(_err.response?.data);
                } else {
                    alert(_err);
                }
            } finally {
                setLoading(false);
                setMessage('')
            }
        }

        loadSectors();
    }, [])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        sector: '',
    })


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true);
            setMessage('Enviando...');
            await addTicket(formData);
            setFormData({
            title: '',
            description: '',
            sector: '',
            });
            alert('Ticket enviado.');
        } catch (_err) {
            if (axios.isAxiosError(_err)) {
              alert(_err.response?.data);
            } else {
                alert(_err);
            }
        } finally {
            setLoading(false);
            setMessage('');
        }
    }

    if(loading) {
        return (
            <LoadingComponent message={message}/>
        )
    } else {
    return (
        <div className="bg-gray-900 py-5 w-[90%] rounded-md">
            <h2 className="text-xl text-center mb-2">Adicionar ticket</h2>

            <form onSubmit={handleSubmit} className="flex flex-col items-center content-center gap-3 px-10">
                <InputForm 
                    id="title"
                    type="text"
                    label="Título"
                    placeholder="Digite o título do ticket"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                />
                <InputForm 
                    id="description"
                    type="text"
                    label="Descrição"
                    placeholder="Digite a descrição do ticket"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />

                <div className="flex flex-col gap-1 w-full">
                <label htmlFor="sector">Setor que o ticket se destina</label>
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
                    Enviar
                </ButtonLogin>
            </form>

        </div>
    )
    }
}