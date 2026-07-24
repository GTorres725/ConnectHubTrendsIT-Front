'use client'

import { useState } from "react"
import { updateStatusTicket } from "../ticket.service"
import axios from "axios"
import { ButtonLogin } from "@/components/ButtonSubmit"
import { InputForm } from "@/components/InputForm"
import { LoadingComponent } from "@/components/LoadingComponent"
import { getErrorMessage } from "@/utils/getAxiosErrorMessage"

type Props = {
    ticketId: number,
}

export function UpdateMyTicketComponent ({ticketId}: Props) {

    const statusOptions = [
        {name: 'finalizationApproved', id:1},
        {name: 'unusable', id:2},
    ]

    const [formData, setFormData] = useState({
        status: '',
        descriptionConclusion: '',
    })

    //boolean loading componnt
    const [loading, setLoading] = useState(false)

    async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const {...data } = formData;

        try {
            setLoading(true);
            await updateStatusTicket({...data, id: ticketId});  
            setFormData({
                descriptionConclusion: '',
                status: ''
            });
            alert('Ação realizada.');
        } catch (_err) {
            getErrorMessage(_err);
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return (
            <LoadingComponent message="Enviando atualização."/>
        )
    } else {
    return (
            <div className="bg-gray-900 py-5 w-[90%] rounded-md">
                <form onSubmit={handleSubmit} className="flex flex-col items-center content-center gap-3 px-10">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="sector">Status do ticket</label>
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
                                    {i.name == 'finalizationApproved' ? 'Aprovado' : 'Inutilizável'}
                                </option>
                            ))
                            }
                        </select>
                    </div>

                    <InputForm 
                        id="description"
                        type="text"
                        label="Conclusão"
                        placeholder="Digite a descrição do serviço realizado"
                        value={formData.descriptionConclusion}
                        onChange={e => setFormData({...formData, descriptionConclusion: e.target.value})}
                    />
    
                    <ButtonLogin type="submit">
                        Enviar
                    </ButtonLogin>
                </form>
            </div>
        )
        }
}