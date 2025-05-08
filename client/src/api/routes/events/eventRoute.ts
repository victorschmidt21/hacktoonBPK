import type { AxiosInstance } from "axios";
import { templateGetAllEvents, templateGetByIdEvent } from "./template";
import type { EventAttributes, EventDTOPost } from "./events";

export class EventRoute {
    server: AxiosInstance | null

    constructor(server: AxiosInstance | null) {
        this.server = server;
    }

    async getAll(): Promise<EventAttributes[]> {
        return (await (this.server?.get("evento")))?.data || templateGetAllEvents;
    }

    async getById(id: string | undefined): Promise<EventAttributes> {
        return (await (this.server?.get("evento/" + id)))?.data || templateGetByIdEvent;
    }

    async post(attributes: EventDTOPost): Promise<void> {
        return (await (this.server?.post("evento", attributes)))
    }
}