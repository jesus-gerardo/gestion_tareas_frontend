// import constants from "@/common/globals/constants";
import { instanceAxios as $http } from "@/plugins/axios";

export class HttpClient {

    static getHeader(contentType: string | any = null) {
        const token = localStorage.getItem('token');
        let headers = {
            "Content-Type": contentType ? contentType : "application/json",
            "Accept": "application/json"
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        console.log(headers);
        return headers;
    }

    static handlerError(error) {
        return new Promise((resolv, reject) => {
            const { status, data } = error.response;
            const { message } = data;
            reject({ status, message, data });
        });
    }

    static async blob(path, method = 'GET') {
        try {
            return await $http({
                url: path,
                method,
                responseType: 'blob',
            });
        } catch (error) {
            console.error(error);
        }
    }

    static async get({
        path,
        params,
        headers
    }) {
        try {
            const headersx = headers ? headers : this.getHeader();
            return await $http.get(path, { params: params, headers: headersx });
        } catch (error) {
            return await this.handlerError(error);
        }
    }

    static async post({
        path,
        payload,
        headers
    }) {
        try {
            let contentHeaders = headers ? headers : this.getHeader();
            if (payload instanceof FormData) {
                contentHeaders = this.getHeader("multipart/form-data");
            }

            return await $http.post(path, payload, { headers: contentHeaders });
        } catch (error) {
            return await this.handlerError(error);
        }
    }

    static async put({
        path,
        payload,
        headers
    }) {
        try {

            let contentHeaders = headers ? headers : this.getHeader();
            if (payload instanceof FormData) {
                contentHeaders = this.getHeader("multipart/form-data");
            }
            return await $http.put(path, payload, { headers: contentHeaders });
        } catch (error) {
            console.error(error);
            return await this.handlerError(error);
        }
    }

    static async patch({
        path,
        payload,
        headers,
    }) {
        try {
            const headersx = headers ? headers : this.getHeader();
            return await $http.patch(path, payload, { headers: headersx });
        } catch (error) {
            console.error(error);
            return await this.handlerError(error);
        }
    }

    static async delete({
        path,
        headers,
    }) {
        try {
            const headersx = headers ? headers : this.getHeader();
            return await $http.delete(path, { headers: headersx });
        } catch (error) {
            console.error(error);
            return await this.handlerError(error);
        }
    }
}