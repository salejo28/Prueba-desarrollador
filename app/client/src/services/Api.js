import { base } from './base'

class Api {
    async roles() {
        return await base.get('/roles', { headers: { 'Content-Type': 'application/json' } })
    }

    async register(data) {
        return await base.post('/auth/register', data, { headers: { 'Content-Type': 'application/json' } })
    }

    async login(data) {
        return await base.post('/auth/login', data, { headers: { 'Content-Type': 'application/json' } })
    }

    async loadConferences(token) {
        return await base.get('/conferences', { headers: { 'x-access-token': `Bearer ${token}` } })
    }

    async loadJoinedConferences(token) {
        return await base.get('/conferences/conferencesByAttendant/', { headers: { 'x-access-token': `Bearer ${token}` } })
    }

    async loadConferencesBySpeaker(token) {
        return await base.get('/conferences/conferencesBySpeaker', { headers: { 'x-access-token': `Bearer ${token}` } })
    }

    async loadAttendantsInConference(id, token) {
        return await base.get("/conferences/view/"+id, { headers: { 'x-access-token': `Bearer ${token}` } })
    }

    async joinConference(token, id) {
        return await base.post("/conferences/join/" + id, null, { headers: { 'x-access-token': `Bearer ${token}` } })
    }

    async newConference(data, token) {
        return await base.post("/conferences/new", data, { headers: { 'x-access-token': `Bearer ${token}`, 'Content-Type': 'application/json' } })
    }

    async editConference(data, token, id) {
        return await base.put("/conferences/"+id, data, { headers: { 'x-access-token': `Bearer ${token}`, 'Content-Type': 'application/json' } })
    }
}

export const api = new Api()