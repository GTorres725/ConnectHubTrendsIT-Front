'use client'

import { useState } from "react"
import { addlogService } from "../logs.service"
import { updateStatusTicket } from "@/features/ticket/ticket.service"
import { InputForm } from "@/components/InputForm"
import { ButtonLogin } from "@/components/ButtonSubmit"
import axios from "axios"
import { LoadingComponent } from "@/components/LoadingComponent"
import { getErrorMessage } from "@/utils/getAxiosErrorMessage"

const statusOptions = [
    {name: 'pending', id:1},
    {name: 'inProgress', id:2},
    {name: 'carriedOut', id:3},
]

export function AddServiceLog () {
    const [formData, setFormData] = useState({
        ticketId: Number(),
        description: '',
        status: ''
    })

    // boolean loading component
    const [loading, setLoading] = useState(false);

    async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { ticketId, description, status } = formData;
        try {
            setLoading(true)

            await updateStatusTicket({status, id: ticketId}); 
            await addlogService({ticketId, description});

            setFormData({
                ticketId: Number(),
                description: '',
                status: ''
            })

            alert('Serviço registrado.')
        } catch (_err) {
            getErrorMessage(_err);
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return <LoadingComponent message="Enviando..."/>
    } else {

    return (
        <div className="bg-gray-900 py-5 w-[90%] rounded-md">
            <h2 className="text-xl text-center mb-2">Adicionar serviço realizado</h2>

            <form onSubmit={handleSubmit} className="flex flex-col items-center content-center gap-3 px-10">
                <InputForm 
                    id="ticketId"
                    type="text"
                    label="Id do ticket"
                    placeholder="Digite a descrição do serviço realizado"
                    value={Number(formData.ticketId)}
                    onChange={e => setFormData({...formData, ticketId: +(e.target.value)})}
                />
                <InputForm 
                    id="description"
                    type="text"
                    label="Descrição"
                    placeholder="Digite a descrição do serviço realizado"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />

                <div className="flex flex-col gap-1 w-full">
                <label htmlFor="sector">Status do ticket após o serviço relizado</label>
                <select
                className="rounded-lg border p-3 focus:border-blue-500"
                id="sector"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                >
                    <option value="" className="bg-black">
                    Selecione um status
                    </option>
                    {statusOptions.map((i) => (
                        <option className="bg-black"
                            key={i.id}
                            value={i.name}
                        >
                            {i.name == 'pending' ? 'Pendente' : i.name == 'inProgress' ? 'Em andamento' : 'Realizado'}
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