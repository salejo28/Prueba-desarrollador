const pool = require('../DB')

async function CreateConference(user, data) {

    if (await ExistConference(data.name)) return {
        success: false,
        error: "The conference already exists!"
    }

    const dataToSave = {
        name: data.name,
        location: data.location,
        quota: data.quota,
        state: data.state,
        date: data.date
    }

    const result = await pool.query('INSERT INTO conferences SET ?', [dataToSave])
    const realtion = {
        conference_id: result.insertId,
        user_id: user
    }

    await pool.query('INSERT INTO conferences_speakers SET ?', [realtion])

    return {
        success: true,
        errors: null
    }
}

async function ExistConference(name) {
    const exist = await pool.query('SELECT * FROM conferences WHERE name = ?', [name])
    if (exist.length > 0) return true
    return false
}

async function GetConferences() {
    return await pool.query('SELECT conferences.*, conferences_speakers.user_id, conferences_speakers.conference_id, users.name AS speakerName FROM conferences JOIN conferences_speakers ON conferences.id = conferences_speakers.conference_id JOIN users ON conferences_speakers.user_id = users.id WHERE state = ?', [1])
}

async function JoinConference(conference_id, user_id) {
    // Validate if is joined
    const exist = await pool.query('SELECT * FROM conferences_attendants WHERE user_id = ?', [user_id])
    if (exist.length > 0) return {
        success: false,
        error: "You're already at the conference"
    }
    // Validate disabled
    const conference = await pool.query('SELECT * FROM conferences WHERE id = ?', [conference_id])
    if (conference[0].state === 0) return {
        success: false,
        error: "Sorry, the conference is disabled"
    }
    // Validate quota
    const relation = await pool.query('SELECT * FROM conferences_attendants WHERE conference_id = ?', [conference_id])
    if (relation.length === conference[0].quota) return {
        success: false,
        error: "Sorry, there is no more space in the conference"
    }

    const relationJoin = {
        conference_id,
        user_id
    }

    await pool.query('INSERT INTO conferences_attendants SET ?', [relationJoin])

    return {
        success: true,
        error: null
    }
}

async function EditConferenceState(conference_id, state) {
    // Validate attendants in conference is state is disabled
    console.log(state)
    if (state === 0) {
        const isEmpty = await pool.query('SELECT * FROM conferences_attendants WHERE conference_id = ?', [conference_id])
        if (isEmpty.length > 0) return {
            success: false,
            error: "The conference has attendants, you cannot disable it",
            message: null
        }
    }

    await pool.query('UPDATE conferences SET state = ? WHERE id = ?', [state, conference_id])
    return {
        success: true,
        error: null,
        message: state === 0 ? "Conference disabled successfully!" : "Conference activated successfully!"
    }
}

async function GetConferencesBySpeaker(user_id) {
    return await pool.query('SELECT conferences.*, conferences_speakers.user_id, conferences_speakers.conference_id FROM conferences JOIN conferences_speakers ON conferences.id = conferences_speakers.conference_id WHERE conferences_speakers.user_id = ?', [user_id])
}

async function GetAttendantsInConference(conference_id) {
    return await pool.query('SELECT users.email, users.name, users.id, conferences_attendants.conference_id FROM users JOIN conferences_attendants ON users.id = conferences_attendants.user_id WHERE conferences_attendants.conference_id = ?', [conference_id])
}

async function GetConferencesByAttendant(user_id) {
    return await pool.query('SELECT conferences.* FROM conferences JOIN conferences_attendants ON conferences.id = conferences_attendants.conference_id WHERE conferences_attendants.user_id = ?', [user_id])
}

module.exports = {
    CreateConference,
    GetConferences,
    JoinConference,
    EditConferenceState,
    GetConferencesBySpeaker,
    GetAttendantsInConference,
    GetConferencesByAttendant
}
