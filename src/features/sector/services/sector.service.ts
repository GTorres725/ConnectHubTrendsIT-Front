import { api } from "@/services/api";
import { Sector } from "../types";

export async function findAllSectors(): Promise<Sector[]> {
    const res = await api.get('/sector');

    return res.data;
}