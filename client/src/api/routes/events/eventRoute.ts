import type { AxiosInstance } from "axios";
import { templateGetAllEvents, templateGetByIdEvent } from "./template";
import type { EventAttributes } from "./events";

export class EventRoute {
    server: AxiosInstance | null

    constructor(server: AxiosInstance | null) {
        this.server = server;
    }

    async getAll(): Promise<EventAttributes[]> {
        return this.server?.get("evento") || templateGetAllEvents;
    }

    async getById(id: string | undefined): Promise<EventAttributes> {
        return this.server?.get("evento/" + id) || templateGetByIdEvent;
    }
}