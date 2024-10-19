import { HttpClient } from "@/utils/httpClient";

export default class AuthRepository extends HttpClient {
    static url = "/";

    static async login(payload) {
        return await this.post({ path: `/login`, payload });
    }

    static async logout() {
        return await this.get({ path: `/logout` });
    }

    static async user() {
        return await this.get({ path: `/user` });
    }


}