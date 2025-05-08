export default class EventModel {
    private evento_id: number;
    private img_url_evento: string;
    private title: string;
    private description: string;
    private dt_start: string;
    private dt_end: string;
    private status: "Em breve" | "Andamento" | "Finalizado";
    private created_at: string;
    private updated_at: string;
  
    constructor(data: {
      evento_id?: number;
      img_url_evento?: string;
      title: string;
      description?: string;
      dt_start: string;
      dt_end: string;
      status?: "Em breve" | "Andamento" | "Finalizado";
      created_at?: string;
      updated_at?: string;
    }) {
      this.evento_id = data.evento_id || 0;
      this.img_url_evento = data.img_url_evento || "";
      this.title = data.title;
      this.description = data.description || "";
      this.dt_start = data.dt_start;
      this.dt_end = data.dt_end;
  
      if (data.status) {
        this.status = data.status;
      } else {
        const currentDate = new Date();
        const startDate = new Date(data.dt_start);
        const endDate = new Date(data.dt_end);
  
        if (currentDate < startDate) {
          this.status = "Em breve";
        } else if (currentDate >= startDate && currentDate <= endDate) {
          this.status = "Andamento";
        } else {
          this.status = "Finalizado";
        }
      }
  
      this.created_at = data.created_at || new Date().toISOString();
      this.updated_at = data.updated_at || new Date().toISOString();
    }
  
    public getEventoId(): number {
      return this.evento_id;
    }
    
    public setEventoId(value: number): void {
      this.evento_id = value;
    }
    
    public getImgUrlEvento(): string {
      return this.img_url_evento;
    }
    
    public setImgUrlEvento(value: string): void {
      this.img_url_evento = value;
    }
    
    public getTitle(): string {
      return this.title;
    }
    
    public setTitle(value: string): void {
      this.title = value;
    }
    
    public getDescription(): string {
      return this.description;
    }
    
    public setDescription(value: string): void {
      this.description = value;
    }
    
    public getDtStart(): string {
      return this.dt_start;
    }
    
    public setDtStart(value: string): void {
      this.dt_start = value;
    }
    
    public getDtEnd(): string {
      return this.dt_end;
    }
    
    public setDtEnd(value: string): void {
      this.dt_end = value;
    }
    
    public getStatus(): "Em breve" | "Andamento" | "Finalizado" {
      return this.status;
    }
    
    public setStatus(value: "Em breve" | "Andamento" | "Finalizado"): void {
      this.status = value;
    }
    
    public getCreatedAt(): string {
      return this.created_at;
    }
    
    public setCreatedAt(value: string): void {
      this.created_at = value;
    }
    
    public getUpdatedAt(): string {
      return this.updated_at;
    }
    
    public setUpdatedAt(value: string): void {
      this.updated_at = value;
    }
    
  }
  
  // evento_id
  // img_url_evento
  // title
  // description
  // dt_start
  // dt_end
  // status
  // updated_at
  // created_at
  
  // event: {
  //     evento_id: 35,
  //     img_url_evento: "https://example.com/eventos/ai2025.png",
  //     title: "Conferência Internacional de Inteligência Artificial 2025",
  //     description:
  //       "Uma conferência anual reunindo especialistas e pesquisadores em IA de todo o mundo.",
  //     dt_start: "2025-08-20T09:00:00Z",
  //     dt_end: "2025-08-23T17:00:00Z",
  //     status: "ativo",
  //     created_at: "2025-03-01T11:00:00Z",
  //     updated_at: "2025-04-10T15:30:00Z",
  //   }
  