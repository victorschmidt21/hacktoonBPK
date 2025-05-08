import User from "./UserModel";

export default class ArticlesModel {
  private article_id: string;
  private tittle: string;
  private creator_id: string;
  private resumo: string;
  private url_arquivo: string;
  private colaborators: User[] | [];
  private key_words: string[];
  private tematic_area: string;
  private status:
    | "Criado"
    | "Andamento"
    | "Revisado"
    | "Aprovado"
    | "Rejeitado";
  private version: number;

  constructor(
    article_id: string,
    tittle: string,
    creator_id: string,
    resumo: string,
    url_arquivo: string,
    colaborators: User[] = [],
    key_words: string[] = [],
    tematic_area: string,
    status: "Criado" | "Andamento" | "Revisado" | "Aprovado" | "Rejeitado",
    version: number
  ) {
    this.article_id = article_id;
    this.tittle = tittle;
    this.creator_id = creator_id;
    this.resumo = resumo;
    this.url_arquivo = url_arquivo;
    this.colaborators = colaborators;
    this.key_words = key_words;
    this.tematic_area = tematic_area;
    this.status = status;
    this.version = version;
  }

  // Getters
  public getArticleId(): string {
    return this.article_id;
  }

  public getTittle(): string {
    return this.tittle;
  }

  public getCreatorId(): string {
    return this.creator_id;
  }

  public getResumo(): string {
    return this.resumo;
  }

  public getUrlArquivo(): string {
    return this.url_arquivo;
  }

  public getColaborators(): User[] {
    return this.colaborators;
  }

  public getKeyWords(): string[] {
    return this.key_words;
  }

  public getTematicArea(): string {
    return this.tematic_area;
  }

  public getStatus():
    | "Criado"
    | "Andamento"
    | "Revisado"
    | "Aprovado"
    | "Rejeitado" {
    return this.status;
  }

  public getVersion(): number {
    return this.version;
  }

  // Setters
  public setArticleId(id: string): void {
    this.article_id = id;
  }

  public setTittle(tittle: string): void {
    this.tittle = tittle;
  }

  public setCreatorId(id: string): void {
    this.creator_id = id;
  }

  public setResumo(resumo: string): void {
    this.resumo = resumo;
  }

  public setUrlArquivo(url: string): void {
    this.url_arquivo = url;
  }

  public setColaborators(colaborators: User[]): void {
    this.colaborators = colaborators;
  }

  public setKeyWords(keyWords: string[]): void {
    this.key_words = keyWords;
  }

  public setTematicArea(area: string): void {
    this.tematic_area = area;
  }

  public setStatus(
    status: "Criado" | "Andamento" | "Revisado" | "Aprovado" | "Rejeitado"
  ): void {
    this.status = status;
  }

  public setVersion(version: number): void {
    this.version = version;
  }
}