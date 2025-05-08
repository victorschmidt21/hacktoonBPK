import type { AxiosInstance } from "axios";
import type { LoginAttributes } from "./login";
import type { User, UserAttributes } from "../user/user";
import { jwtDecode } from 'jwt-decode';

export class LoginRoute {
    server: AxiosInstance | null

    constructor(server: AxiosInstance | null) {
        this.server = server
    }

    async post(attributes: LoginAttributes): Promise<UserAttributes> {
        const response = await this.server!.post("user/login", attributes);
        console.log(response);
        const userPayload = jwtDecode(response.data.token) as UserAttributes;

        return userPayload;
    }
}