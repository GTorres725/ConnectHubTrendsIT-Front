import { Status } from "@/components/CardTickets";

export type Ticket = {
    id: number;
    sectorId: number;
    title: string;
    description: string;
    status: Status;
    descriptionConclusion: string | null;
    createdAt: string;
    updatedAt: string;
    creatorId: number;
}