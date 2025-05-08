import type { AxiosInstance } from "axios";
import type { LoginAttributes } from "./login";
import type { User, UserAttributes } from "../user/user";
import jwt from 'jsonwebtoken';

export class LoginRoute {
    server: AxiosInstance

    constructor(server: AxiosInstance) {
        this.server = server
    }

    async post(attributes: LoginAttributes): Promise<UserAttributes> {
        const response = await this.server.post("login", attributes);

        const userPayload = jwt.decode(response.data.token) as User;

        return userPayload;
    }
}