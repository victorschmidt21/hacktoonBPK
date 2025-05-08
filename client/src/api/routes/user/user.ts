export interface UserAttributes {
    id: string
    email: string
    type: "admin" | "autor" | "avaliador"
    name: string
    url_img_user: string
}
  
export class User implements UserAttributes {
    id: string
    email: string
    url_img_user: string
    name: string
    type: "admin" | "autor" | "avaliador"

    constructor(attributes: UserAttributes) {
        this.id = attributes.id;
        this.email = attributes.email;
        this.url_img_user = attributes.url_img_user;
        this.name = attributes.name;
        this.type = attributes.type;
    }
}