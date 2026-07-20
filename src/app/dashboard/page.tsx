'use client'

import { ButtonCardsFilterTickets } from "@/components/ButtonCardsFilterTickets";
import { ButtonNavDash } from "@/components/ButtonNavDash";
import { me } from "@/features/auth/services/auth.service";
import { findTickets } from "@/features/ticket/ticket.service";
import { Ticket } from "@/features/ticket/type";
import { UserDataComponent } from "@/features/user/components/UserDataComponent";
import { User } from "@/features/user/type";
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

    //tickets
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        async function loadTickets() {
            try {
                const tickets = await findTickets();
                setTickets(tickets);
            } catch (_err) {
                alert(_err)
            }
        }

        loadTickets();
    }, []);

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

    return (
       <div className="w-screen">
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

            <div className="flex flex-wrap justify-center content-center gap-2 sm:grid sm:grid-cols-5 w-[90%] mx-auto my-3 md:">
                <ButtonCardsFilterTickets
                label="Quantidade"
                value={tickets.length}
                click={() => {setActiveButtonFilter('all'); console.log('cl')}}
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

            <main>
                {tickets.length == 0 ?
                    <p>Nenhum ticket foi encontrado</p> 
                    :
                    filteredTickets.map((i) => (
                        <div key={i.id}>
                            <h3>Ticket ID: {i.id}</h3>
                            <h3>{i.title}</h3>
                            <p>{i.description}</p>
                            <span>{i.status}</span>
                        </div>
                    )
                )}
            </main>
       </div>
    )
}