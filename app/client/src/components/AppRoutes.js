import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useAuthState } from '../context'

export const AppRoutes = ({ component: Component, path, isPrivate, isSpeaker, isAttendant, ...rest }) => {
    const user = useAuthState()
    return (
        <Route 
            path={path}
            render={props => 
                isPrivate && !Boolean(user.token) ? (
                    <Redirect to={{ pathname: "/" }} />
                ) : isSpeaker && user.user.role_id !== 1 ? (
                    <Redirect to={{ pathname: "/conferences" }} />
                ) : isAttendant && user.user.role_id !== 2 ? (
                    <Redirect to={{ pathname: "/conferences" }} />
                ) : (
                    <Component {...props} />
                )
            }
            {...rest}
        />
    )
}