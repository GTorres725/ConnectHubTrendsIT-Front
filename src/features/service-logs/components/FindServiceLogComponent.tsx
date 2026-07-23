'use client'

import { useEffect, useState } from "react"
import { ServiceLog } from "../types"
import { findLogService } from "../logs.service"
import axios from "axios";
import { LoadingComponent } from "@/components/LoadingComponent";

type Props = {
  ticketId: number;
  title: string;
  click?: () => void;
};

export function FindServiceLogComponent ({ticketId, title, click}: Props) {
    const [serviceLogs, setServiceLogs] = useState<ServiceLog[]>([])

    //boolean loading component
    const [loading, setLoading] = useState(true);

    async function loadServiceLogs() {
        try {
            setLoading(true)

            const serviceLogs = await findLogService(ticketId);

            setServiceLogs(serviceLogs)
        } catch (_err)  {
            if (axios.isAxiosError(_err)) {
              alert(_err.response?.data);
            } else {
                alert(_err);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadServiceLogs()
    }, [])

    if(loading) {
        return (
            <LoadingComponent />
        )
    } else {
    return (
        <div className="w-full flex items-center justify-center py-2">
            <div className="flex flex-col items-center justify-center bg-gray-900 w-[95%] rounded-2xl py-3">
                <h2 className="">Registro de serviços realizados para o ticket</h2>
                <div className="flex flex-col items-center w-full justify-center">
                    <div className="flex items-center">
                        <p className="text-sm text-gray-400">Ticket ID:</p>
                        {"\u00A0"}
                        {"\u00A0"}
                        <h3>{ticketId}</h3>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm text-gray-400">Título do ticket: </p>
                        {"\u00A0"}
                        {"\u00A0"}
                        <h3>{title}</h3>
                    </div>
                </div>
                <div className="flex flex-col py-2 w-full items-center justify-center">
                    {serviceLogs.length == 0 ? 
                        'Não há serviços registrados para esse ticket'
                        : 
                        serviceLogs.map((i) => (
                            <div key={i.id} className="bg-black rounded-xl py-2 px-3 w-[90%]">
                                <p className="text-sm text-gray-400">Descrição do Serviço</p>
                                <p>{i.description}</p>
                                <div className="flex justify-around text-sm text-gray-400 mt-2">
                                    <p>{new Date(i.createdAt).toLocaleDateString('pt-BR')}</p>
                                    <p>Usuário: {i.user.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <button onClick={click} className="
                    cursor-pointer
                    rounded-xl
                    border
                    border-zinc-800
                    bg-black
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-red-700
                    transition-all
                    duration-200    
                    hover:border-red-800
                    hover:bg-black-500/5
                    ">
                        Fechar
                </button>
            </div>
        </div>
    )
    }
}