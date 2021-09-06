import { Conferences } from "../pages/Conferences";
import { JoindeConferences } from "../pages/JoinedConferences";
import { Login } from "../pages/Login";
import { MyConferences } from "../pages/MyConferences";
import { NewConference } from "../pages/NewConference";
import { Register } from "../pages/Register";
import { ViewConference } from "../pages/ViewConference";


export const routes = [
    {
        path: "/",
        component: Login,
        isPrivate: false,
        isSpeaker: false,
        isAttendant: false
    },
    {
        path: "/register",
        component: Register,
        isPrivate: false,
        isSpeaker: false,
        isAttendant: false
    },
    {
        path: "/conferences",
        component: Conferences,
        isPrivate: true,
        isSpeaker: false,
        isAttendant: false
    },
    {
        path: "/my-conferences",
        component: MyConferences,
        isPrivate: true,
        isSpeaker: true,
        isAttendant: false
    },
    {
        path: "/joined-conferences",
        component: JoindeConferences,
        isPrivate: true,
        isSpeaker: false,
        isAttendant: true
    },
    {
        path: "/new",
        component: NewConference,
        isPrivate: true,
        isSpeaker: true,
        isAttendant: false
    },
    {
        path: "/view/:conference_id",
        component: ViewConference,
        isPrivate: true,
        isSpeaker: true,
        isAttendant: false
    }
]