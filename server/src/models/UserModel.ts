class User {
  private id: string | null | undefined;
  private name: string | null | undefined;
  private password: string;
  private email: string;
  private url_img_user: string | null | undefined;
  private type: string;
  private create_at: Date | null | undefined;
  private updated_at: Date | null | undefined;

  constructor(
    email: string,
    password: string,
    type: string,
    name?: string,
    id?: string | null,
    url_img_user?: string | null,
    create_at?: Date | null | undefined,
    updated_at?: Date | null | undefined
  ) {
    this.email = email;
    this.password = password;
    this.url_img_user = url_img_user;
    this.type = type;

    if (id) {
      this.id = id;
    }
    if (create_at) {
      this.create_at = create_at;
    }
    if (updated_at) {
      this.updated_at = updated_at;
    }
    if (name) {
      this.name = name;
    }
  }

  public getEmail(): string {
    try {
      return this.email;
    } catch (error) {
      throw new Error(
        "It was not possible to recover the email because: " + error
      );
    }
  }
  public getType(): string {
    try {
      return this.type;
    } catch (error) {
      throw new Error(
        "It was not possible to recover the type because: " + error
      );
    }
  }

  public geturl_img_user(): string | null | undefined {
    try {
      return this.url_img_user;
    } catch (error) {
      throw new Error(
        "It was not possible to recover the path image because: " + error
      );
    }
  }
  public getPassword(): string {
    try {
      return this.password;
    } catch (error) {
      throw new Error(
        "It was not possible to recover the password because: " + error
      );
    }
  }

  public getId(): string | null | undefined {
    try {
      return this.id;
    } catch (error) {
      throw new Error(
        "It was not possible to recover the user id because: " + error
      );
    }
  }

  public getName(): string | null | undefined {
    try {
      return this.name;
    } catch (error) {
      throw new Error(
        "It was not possible to recover the email because: " + error
      );
    }
  }

  public getCreateDate(): Date | null | undefined {
    try {
      return this.create_at;
    } catch (error) {
      throw new Error(
        "It was not possible to recover the email because: " + error
      );
    }
  }

  public getUpdateDate(): Date | null | undefined {
    try {
      return this.updated_at;
    } catch (error) {
      throw new Error(
        "It was not possible to recover the email because: " + error
      );
    }
  }
}

export default User;
