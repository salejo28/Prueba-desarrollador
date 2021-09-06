import axios from 'axios'

class Base {

    constructor() {
        this.url = "http://localhost:4000/api";
        this.service = axios.create({ baseURL: this.url })
    }

    async apiCall(request) {
        try {
            return (await request()).data
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    }

    async get(to, headers) {
        return await this.apiCall(() => this.service.get(to, headers))
    }

    async post(to, data, headers) {
        return await this.apiCall(() => this.service.post(to, data, headers));
    }

    async put(to, data, headers) {
        return await this.apiCall(() => this.service.put(to, data, headers))
    }

}

export const base = new Base();