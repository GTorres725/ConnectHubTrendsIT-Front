'use client'

import { ButtonCardsFilterTickets } from "@/components/ButtonCardsFilterTickets";
import { ButtonNavDash } from "@/components/ButtonNavDash";
import { CardTickets } from "@/components/CardTickets";
import { LoadingComponent } from "@/components/LoadingComponent";
import { me } from "@/features/auth/services/auth.service";
import { AddServiceLog } from "@/features/service-logs/components/AddServiceLog";
import { FindServiceLogComponent } from "@/features/service-logs/components/findServiceLogComponent";
import { AddTicketComponent } from "@/features/ticket/components/AddTicketsComponent";
import { MyTicketsComponent } from "@/features/ticket/components/MyTicketsComponent";
import { findTickets } from "@/features/ticket/ticket.service";
import { Ticket } from "@/features/ticket/type";
import { UserDataComponent } from "@/features/user/components/UserDataComponent";
import { User } from "@/features/user/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage () {
    const router = useRouter()

    //user
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const token = localStorage.getItem("token");
        //Validando se há token no loocalstorage, usando dentro do useEfect por mexer com navegador
        if (!token) {
        router.push("/");
        }

        // Validando se o token é valido e já definindo o user
        async function loadUser() {
            try {
                const {user} = await me(); //desestruturando pq vem user e data, por isso estou puxando o {user}
                setUser(user)
            } catch (_err) {
                localStorage.removeItem("token");
                router.push("/");
            }
        }

        loadUser();
    }, []);

    //booelan p/ o component loading
    const [loading, setLoading] = useState(true);

    //data p filtrar
    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    //tickets
    const [tickets, setTickets] = useState<Ticket[]>([]);

    async function loadTickets() {
        try {
            setLoading(true)

            const tickets = await findTickets(date);
            
            setTickets(tickets);
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
        loadTickets();
    }, [date]);

    //Identificando a qtd de tickets por status para colocar nos buttonsCard
    function ticketValuesCards (termo: string): number {
        const ticketsFil: Ticket[] = []
        tickets.forEach((i) => {
        if (i.status == termo) ticketsFil.push(i)
        });
        return ticketsFil.length
    }

    //Filtrando os tickets para aparecerem no map
    const [activeButtonFilter, setActiveButtonFilter] = useState('all');
    const filteredTickets = activeButtonFilter === "all" ? tickets : tickets.filter(ticket => ticket.status === activeButtonFilter);

    //Configurando boolean dos botoes navdash
    const [booleanBtnNavDash, setBooleanBtnNavDash] = useState({value: '', hability: false})

    //boolean para o component dos logs 
    const [booleanServiceLogsComponent, setBooleanServiceLogsComponent] = useState({id: '', title: '', hability: false})

    if(loading) {
        return (
            <LoadingComponent message="Conectando ao servidor... Isso pode levar até 1 minuto devido a hospedagem."/>
        )
    } else {
    return (
       <div className="w-screen flex flex-col items-center max-w-5xl">
            <header className="w-full mb-2.5 pt-2.5 bg-blue-900 flex flex-col content-center justify-center">
                {user && (
                    <div className="w-[90%] text-center mx-auto">
                        <h1 className="mb-3">
                            Olá, {user.name}
                        </h1>
                        <div className="flex flex-wrap justify-center gap-2.5 sm:grid sm:grid-cols-4 mx-auto mb-3">
                            <ButtonNavDash label='Meus Tickets' click={ () => setBooleanBtnNavDash({value: 'myTickets', hability: !booleanBtnNavDash.hability}) }/>
                            <ButtonNavDash label='Novo Ticket' click={ () => setBooleanBtnNavDash({value: 'addTicket', hability: !booleanBtnNavDash.hability}) }/>
                            <ButtonNavDash label='Adicionar serviço' click={ () => setBooleanBtnNavDash({value: 'addService', hability: !booleanBtnNavDash.hability}) }/>
                            <ButtonNavDash label='Meus Dados' click={ () => setBooleanBtnNavDash({value: 'myData', hability: !booleanBtnNavDash.hability}) }/>
                        </div>
                    </div>
                )}
            </header>

            
                {booleanBtnNavDash.value == 'myData' && booleanBtnNavDash.hability ? 
                    <UserDataComponent name={user?.name} email={user?.email} sectorId={user?.sectorId} userId={user?.id} /> : ''
                }
                {booleanBtnNavDash.value == 'addTicket' && booleanBtnNavDash.hability ? 
                    <AddTicketComponent /> : ''
                }
                {booleanBtnNavDash.value == 'addService' && booleanBtnNavDash.hability ? 
                    <AddServiceLog /> : ''
                }
                {booleanBtnNavDash.value == 'myTickets' && booleanBtnNavDash.hability ? 
                    <MyTicketsComponent/>
                :
                    ''
                }

                {!booleanBtnNavDash.hability && 
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
                }

            
                {!booleanBtnNavDash.hability &&
                    <div className="flex flex-wrap justify-center content-center gap-2 sm:grid sm:grid-cols-5 w-[90%] mx-auto my-3 md:">
                        <ButtonCardsFilterTickets
                        label="Quantidade"
                        value={tickets.length}
                        click={() => {setActiveButtonFilter('all')}}
                        />
                        <ButtonCardsFilterTickets
                            label="Pendentes"
                            value={ticketValuesCards('pending')}
                            click={() => setActiveButtonFilter('pending')}
                        />
                        <ButtonCardsFilterTickets 
                            label="Andamento"
                            value={ticketValuesCards('inProgress')}
                            click={() => setActiveButtonFilter('inProgress')}
                        />
                        <ButtonCardsFilterTickets 
                            label="Finalizados"
                            value={ticketValuesCards('carriedOut')}
                            click={() => setActiveButtonFilter('carriedOut')}
                        />
                        <ButtonCardsFilterTickets 
                            label="Aprovados"
                            value={ticketValuesCards('finalizationApproved')}
                            click={() => setActiveButtonFilter('finalizationApproved')}
                        />
                    </div>
                }
            {!booleanBtnNavDash.hability &&
                <button onClick={loadTickets} className="
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
                    mb-3
                    ">
                    Atualizar Tickets
                </button>
            }

            {!booleanBtnNavDash.hability && 
                ( booleanServiceLogsComponent.hability ?
                    <FindServiceLogComponent ticketId={+(booleanServiceLogsComponent.id)} title={booleanServiceLogsComponent.title} click={() => setBooleanServiceLogsComponent({hability: false, id: '', title: ''})}/>
                    :
                    <main className="w-full">
                        {tickets.length == 0 ?
                            <p>Nenhum ticket foi encontrado</p> 
                            :
                            filteredTickets.map((i) => (
                                <CardTickets
                                    click={() => ( setBooleanServiceLogsComponent({id: `${i.id}`, title:`${i.title}`, hability: true}) )}
                                    key={i.id} 
                                    id={i.id}
                                    title={i.title}
                                    sector={i.sector.name}
                                    status={i.status}
                                    description={i.description}
                                    date={i.createdAt}
                                />
                            )
                        )}
                    </main>    
                )
            }
       </div>
    )
    }
}