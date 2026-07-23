export type ServiceLog = {
    id: number;
    description: string;
    ticketId: number;
    userId: number;
    createdAt: string;
    user: {
        name: string
    }
}