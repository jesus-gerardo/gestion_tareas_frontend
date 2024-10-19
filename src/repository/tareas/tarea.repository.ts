import { HttpClient } from "@/utils/httpClient";

export default class TareasRepository extends HttpClient {
    static url = "/tareas";

    static async findAll(params = {}) {
        return await this.get({ path: `${this.url}`, params });
    }

    static async create(payload) {
        return await this.post({ path: `${this.url}`, payload });
    }

    static async findOne(id) {
        return await this.get({ path: `${this.url}/${id}` });
    }

    static async update(id, payload) {
        return await this.put({ path: `${this.url}/${id}`, payload });
    }

    static async remove(id: number) {
        return await this.delete({ path: `${this.url}/${id}`});
    }

    static async ordenar(payload) {
        return await this.post({ path: `${this.url}/ordenar`, payload });
    }
}