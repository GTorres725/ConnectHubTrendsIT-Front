import { api } from "@/services/api";

type addLogService = {
    ticketId: number | null;
    description: string;
}


export async function addlogService(data: addLogService) {
    const res = await api.post('service-log', data);

    return res.data;
}

export async function findLogService(ticketId: number) {
    const res = await api.get(`service-log/${ticketId}`);

    return res.data;
}