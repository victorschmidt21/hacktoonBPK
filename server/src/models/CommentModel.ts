import User from "../models/UserModel";

class CommentModel {
    private id: string | null | undefined;
    private article_id: string | null | undefined;
    private text: string
    private user_id: String | null | undefined;
    private create_at: Date | null | undefined;
    private updated_at: Date | null | undefined;
    private user: User | null | undefined;

    constructor(
        id: string| null | undefined,
        text: string,
        article_id?: string| null | undefined,
        user_id?: String| null | undefined,
        create_at?: Date| null | undefined,
        updated_at?: Date| null | undefined,
        user?: User| null | undefined,
    ) {
        this.id = id;
        this.article_id = article_id;
        this.text = text;
        this.user_id = user_id ?? null;
        this.updated_at = updated_at ?? null;
        this.user = user ?? null;
    }

    public getId(): string | null | undefined {
        return this.id;
    }

    public setId(id: string | null | undefined): void {
        this.id = id;
    }

    public getUser(): User | null | undefined {
        return this.user;
    }

    public setUser(user: User | null | undefined): void {
        this.user = user;
    }

    public getArticleId(): string | null | undefined {
        return this.article_id;
    }

    public setArticleId(article_id: string | null | undefined): void {
        this.article_id = article_id;
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }



    public getUserId(): String | null | undefined {
        return this.user_id;
    }

    public setUserId(user_id: String | null | undefined): void {
        this.user_id = user_id;
    }

    public getCreateAt(): Date | null | undefined {
        return this.create_at;
    }

    public setCreateAt(create_at: Date | null | undefined): void {
        this.create_at = create_at;
    }

    public getUpdatedAt(): Date | null | undefined {
        return this.updated_at;
    }

    public setUpdatedAt(updated_at: Date | null | undefined): void {
        this.updated_at = updated_at;
    }
} export default CommentModel

