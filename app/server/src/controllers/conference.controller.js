const { 
    CreateConference, 
    GetConferences, 
    JoinConference, 
    EditConferenceState, 
    GetConferencesBySpeaker, 
    GetAttendantsInConference,
    GetConferencesByAttendant
} = require('../models/ConferenceModel')

class ConferenceController {

    async ViewConference(req, res) {        
        const { conference_id } = req.params
        const attendants = await GetAttendantsInConference(conference_id)
        return res.json({
            attendants
        })
    }

    async GetConferencesByAttendant(req, res) {
        const { user_id } = req.user
        const conferences = await GetConferencesByAttendant(user_id)
        return res.json({
            conferences
        })
    }

    async GetConferencesBySpeaker(req, res) {
        const { user_id } = req.user
        const conferences = await GetConferencesBySpeaker(user_id)
        return res.json({
            conferences
        })
    }

    async GetConferences(req, res) {
        const conferences = await GetConferences()
        return res.json({
            conferences
        })
    }

    async CreateConference(req, res) {
        const { user_id } = req.user
        const { error, success } = await CreateConference(user_id, req.body)
        if (!success) return res.json({
            success,
            error
        })

        return res.json({
            success,
            message: 'Conference created successfully!'
        })
    }

    async JoinConference(req, res) {

        const { user_id } = req.user
        const { conference_id } = req.params
        const { success, error } = await JoinConference(conference_id, user_id)
        if (!success) return res.json({
            success,
            error
        })

        return res.json({
            success,
            message: "You entered the conference"
        })
    }

    async EditConferenceState(req, res) {
        const { conference_id } = req.params
        const { error, success, message } = await EditConferenceState(conference_id, req.body.state)
        if (!success) return res.json({
            success,
            error
        })

        return res.json({
            success,
            message
        })
    }

}

module.exports = new ConferenceController()