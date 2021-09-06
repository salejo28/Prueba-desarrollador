import React, { useState, useEffect } from 'react'
import {
    Container,
    Card,
    CardContent,
    CardActions,
    Typography,
    makeStyles,
    Button,
    Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useAuthState } from '../context'
import { api } from '../services/Api'
import { formatDate } from '../utils/utils'

export const Conferences = (props) => {
    const classes = useStyles();
    const [mounted, setMounted] = useState(true)
    const [conferences, setConferences] = useState(null)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')
    const user = useAuthState()

    useEffect(() => {
        if (mounted) {
            loadConferences()
        }

        return () => {
            setMounted(false)
        }
    }, [mounted, conferences])

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return

        setOpen(false)
    }

    const loadConferences = async () => {
        const res = await api.loadConferences(localStorage.getItem('token'))
        setConferences(res.conferences)
    }

    const join = async (id) => {
        const res = await api.joinConference(localStorage.getItem('token'), id)
        if (!res.success) {
            setVariant('error')
            setMessage(res.error)
        } else {
            setVariant('success')
            setMessage(res.message)
        }
        setOpen(true)
    }

    return (
        <Container maxWidth="sm">
            {
                conferences !== null && conferences.map(conference => {
                    return (
                        <Card key={conference.id} className={classes.mar}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {conference.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Speaker: {conference.speakerName}
                                    <br />
                                    Date: {formatDate(conference.date)}
                                    <br />
                                    Location: {conference.location}
                                    <br />
                                    Quota: {conference.quota}
                                </Typography>
                            </CardContent>
                            {user.user.role_id === 2 && (
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        variant="contained"
                                        onClick={() => join(conference.id)}
                                    >
                                        Join
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    )
                })
            }
            {
                (conferences === null || conferences.length === 0) && (
                    <Typography>
                        No conferences
                    </Typography>
                )
            }
            <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
                <Alert severity={variant}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    mar: {
        margin: '20px 0'
    }
});