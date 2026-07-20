import { api } from "@/services/api";

type addTicketData = {
    title: string;
    description: string;
    sector: string;
}

export async function findTickets () {
    const res = await api.get('ticket');
    
    return res.data
}

export async function addTicket (data: addTicketData) {
    const res = await api.post('ticket', data)

    return res.data;
}