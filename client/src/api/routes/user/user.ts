export interface UserAttributes {
    email: string
    type: "admin" | "autor" | "avaliador"
    name: string
    image: string
}
  
export class User implements UserAttributes {
    email: string
    image: string
    name: string
    type: "admin" | "autor" | "avaliador"

    constructor(attributes: UserAttributes) {
        this.email = attributes.email;
        this.image = attributes.image;
        this.name = attributes.name;
        this.type = attributes.type;
    }
}