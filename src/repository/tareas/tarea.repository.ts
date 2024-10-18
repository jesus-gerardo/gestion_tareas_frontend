import { HttpClient } from "@/utils/httpClient";

export default class TareasRepository extends HttpClient {
    static url = "/tareas";

    static async findAll(params = {}) {
        return await this.get({ path: `${this.url}`, params, credencial: false });
    }

    static async create(payload) {
        return await this.post({ path: `${this.url}`, payload, credencial: false });
    }

    static async findOne(id) {
        return await this.get({ path: `${this.url}/${id}`, credencial: false });
    }

    static async update(id, payload) {
        return await this.put({ path: `${this.url}/${id}`, payload, credencial: false });
    }

    static async remove(id: number) {
        return await this.delete({ path: `${this.url}/${id}`, credencial: false });
    }
}