'use client'

import { useEffect, useState } from "react";
import { findMyTickets } from "../ticket.service";
import { Ticket } from "../type";
import { CardTickets } from "@/components/CardTickets";
import { FindServiceLogComponent } from "@/features/service-logs/components/FindServiceLogComponent";
import { UpdateMyTicketComponent } from "./UpdateMyTicketComponent";
import axios from "axios";
import { LoadingComponent } from "@/components/LoadingComponent";


export function MyTicketsComponent () {
    //data p filtrar
    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [tickets, setTickets] = useState<Ticket[]>([])

    // boolean loading component
    const [loading, setLoading] = useState(true);

        async function loadTickets() {
            try {
                setLoading(true)
                const tickets = await findMyTickets(date)
                setTickets(tickets)
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

    useEffect(() => {
        loadTickets()
    }, [date])


    const [booleanServiceLogsComponent, setBooleanServiceLogsComponent] = useState({id: '', title: '', hability: false})
    const [booleanUpdateMyTickets, setBooleanUpdateMyTickets] = useState({id: '', hability: false})

    if(loading) {
        return (
            <LoadingComponent />
        )
    } else {
    return (
        <div className="bg-black w-full flex flex-col items-center gap-5">
            <h1 className="text-xl">Meus tickets</h1>
            <div  className="text-center">
                <div>
                    <h3>Data de criação dos tickets</h3>
                    <p className="text-sm text-gray-400">Exibição e armazenamento em UTC.</p>
                </div>
                <div>
                    <input className="bg-blue-900 p-2 rounded-md mt-1" type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}/>
                </div>
            </div>
            <div className="w-[90%] bg-black">
                    {booleanServiceLogsComponent.hability ?
                        <FindServiceLogComponent ticketId={+(booleanServiceLogsComponent.id)} title={booleanServiceLogsComponent.title} click={() => setBooleanServiceLogsComponent({hability: false, id: '', title: ''})}/>
                    :
                        tickets.map((i) => (
                            <div key={i.id} className="flex flex-col items-center">
                                <CardTickets
                                    click={() => (setBooleanServiceLogsComponent({ id: `${i.id}`, title: `${i.title}`, hability: true }))}
                                    key={i.id}
                                    id={i.id}
                                    title={i.title}
                                    sector={i.sector.name}
                                    status={i.status}
                                    description={i.description}
                                    date={i.createdAt}
                                />
                                <button className="
                                    cursor-pointer
                                    rounded-xl
                                    border
                                    border-zinc-800
                                    bg-transparent
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-blue-700
                                    transition-all
                                    duration-200    
                                    hover:border-blue-800
                                    hover:bg-blue-500/5
                                    mb-1
                                    -mt-2.5
                                    "
                                    onClick={() => setBooleanUpdateMyTickets({ id: `${i.id}`,  hability: !booleanUpdateMyTickets.hability})}>
                                    Abrir/Fechar edição
                                </button>
                                {booleanUpdateMyTickets.hability && i.id == +booleanUpdateMyTickets.id ? 
                                    <div className="mb-5 w-[90%] flex justify-center">
                                        <UpdateMyTicketComponent ticketId={i.id}/>
                                    </div>
                                :
                                    <div className="h-4"></div>
                                }
                            </div>
                        )
                    )}
            </div>
        </div>
    )
    }
}