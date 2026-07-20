export type Ticket = {
    id: number;
    sectorId: number;
    title: string;
    description: string;
    status: string;
    descriptionConclusion: string | null;
    createdAt: Date;
    updatedAt: Date;
    creatorId: number;
}