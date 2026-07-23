import { api } from "@/services/api";

type AddTicketData = {
    title: string;
    description: string;
    sector: string;
}

export type updateTicket = {
    status: string;
    id: number;
    descriptionConclusion?: string,
}

export async function findTickets (date?: string) {
    const res = await api.get('ticket', {
            params: {
                date,
            },
        });

    return res.data;
}

export async function findMyTickets (date?: string) {
    const res = await api.get('ticket/myTickets', {
            params: {
                date,
            },
        });

    return res.data;
}



export async function addTicket (data: AddTicketData) {
    const res = await api.post('ticket', data)

    return res.data;
}

export async function updateStatusTicket ({id, ...data}: updateTicket) {
    const res = await api.patch(`ticket/${id}`, data)

    return res.data;
}