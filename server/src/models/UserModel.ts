class User {
  private id: string | null | undefined;
  private name: string | null | undefined;
  private password: string;
  private email: string;
  private url_img_user: string | null | undefined;
  private type: string | null | undefined;
  private create_at: Date | null | undefined;
  private updated_at: Date | null | undefined;

  constructor(
    email: string,
    password: string,
    type?: string | null | undefined,
    name?: string | null | undefined,
    id?: string | null,
    url_img_user?: string | null,
    create_at?: Date | null | undefined,
    updated_at?: Date | null | undefined
  ) {
    this.email = email;
    this.password = password;
    this.type = type;
    this.url_img_user = url_img_user;
    if (id) this.id = id;
    if (name) this.name = name;
    if (create_at) this.create_at = create_at;
    if (updated_at) this.updated_at = updated_at;
  }

  public getEmail(): string {
    return this.email;
  }

  public getType(): string | null | undefined {
    return this.type;
  }

  public geturl_img_user(): string | null | undefined {
    return this.url_img_user;
  }

  public getPassword(): string {
    return this.password;
  }

  public getId(): string | null | undefined {
    return this.id;
  }

  public getName(): string | null | undefined {
    return this.name;
  }

  public getCreateDate(): Date | null | undefined {
    return this.create_at;
  }

  public getUpdateDate(): Date | null | undefined {
    return this.updated_at;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setType(type: string): void {
    this.type = type;
  }

  public setName(name: string | null): void {
    this.name = name;
  }

  public setId(id: string | null): void {
    this.id = id;
  }

  public setUrlImgUser(url: string | null): void {
    this.url_img_user = url;
  }

  public setCreateDate(date: Date | null): void {
    this.create_at = date;
  }

  public setUpdateDate(date: Date | null): void {
    this.updated_at = date;
  }
}

export default User;
