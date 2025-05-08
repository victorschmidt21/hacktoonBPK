export interface EventAttributes {
    evento_id: number
    img_url_evento: string
    title: string
    description: string
    dt_start: string
    dt_end: string
    status: string
    updated_at: string
    created_at: string
}

export class Event implements EventAttributes {
    created_at: string
    description: string
    dt_end: string
    dt_start: string
    evento_id: number
    img_url_evento: string
    status: string
    title: string
    updated_at: string

    constructor(attributes: EventAttributes) {
        this.created_at = attributes.created_at;
        this.description = attributes.description;
        this.dt_end = attributes.dt_end;
        this.dt_start = attributes.dt_start;
        this.evento_id = attributes.evento_id;
        this.img_url_evento = attributes.img_url_evento;
        this.status = attributes.status;
        this.title = attributes.title;
        this.updated_at = attributes.updated_at;
    }
}