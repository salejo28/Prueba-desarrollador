import React from 'react'
import { Link } from 'react-router-dom'
import {
    CssBaseline,
    AppBar,
    makeStyles,
    Typography,
    Toolbar
} from '@material-ui/core'
import { logout, useAuthDispatch, useAuthState } from '../context';

export const Nav = () => {
    const classes = useStyles();
    const user = useAuthState()
    const dispatch = useAuthDispatch()
    if (!Boolean(user.token)) return <></>

    const handleLogout = () => {
        logout(dispatch)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Conferences App
                    </Typography>
                    <nav>
                        <Link to="/conferences" className={classes.link}>
                            All Conferences
                        </Link>
                        {
                            user.user.role_id === 2 && (
                                <Link to="/joined-conferences" className={classes.link}>
                                    Joined Conferences
                                </Link>
                            )
                        }
                        {
                            user.user.role_id === 1 && (
                                <Link to="/my-conferences" className={classes.link}>
                                    My Conferences
                                </Link>
                            )
                        }
                        {user.user.role_id === 1 && (
                            <Link to="/new" className={classes.link}>
                                New Conference
                            </Link>
                        )}
                        <Link to="/" className={classes.link} onClick={handleLogout}>
                            Logout
                        </Link>
                    </nav>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
        color: "#000",
        textDecoration: 'none'
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
}));