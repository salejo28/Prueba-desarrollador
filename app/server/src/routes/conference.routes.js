const { Router } = require('express')
const {authenticate, isAttendant, isSpeaker} = require('../auth/auth')
const ConferenceController = require('../controllers/conference.controller')

class ConferenceRoutes {

    constructor() {
        this.router = Router({ strict: true })
        this.controller = ConferenceController

        this.CreateConference()
        this.GetConference()
        this.GetConferencesSpeaker()
        this.GetConferencesAttendant()
        this.GetConferences()
        this.JoinConference()
        this.EditConference()
    }

    GetConference() {
        this.router.get('/view/:conference_id', [authenticate, isSpeaker], this.controller.ViewConference)
    }

    GetConferences() {
        this.router.get('/', authenticate, this.controller.GetConferences)
    }

    GetConferencesSpeaker() {
        this.router.get('/conferencesBySpeaker', [authenticate, isSpeaker], this.controller.GetConferencesBySpeaker)
    }

    GetConferencesAttendant() {
        this.router.get('/conferencesByAttendant/', [authenticate, isAttendant], this.controller.GetConferencesByAttendant)
    }

    CreateConference() {
        this.router.post('/new', [authenticate, isSpeaker], this.controller.CreateConference)
    }

    JoinConference() {
        this.router.post('/join/:conference_id', [authenticate, isAttendant], this.controller.JoinConference)
    }

    EditConference() {
        this.router.put('/:conference_id', [authenticate, isSpeaker], this.controller.EditConferenceState)
    }

}

module.exports = new ConferenceRoutes().router