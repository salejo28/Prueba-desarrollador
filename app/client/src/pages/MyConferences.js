import React, { useEffect, useState } from 'react'
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
import { RemoveRedEye } from '@material-ui/icons'
import { api } from '../services/Api'
import { formatDate } from '../utils/utils'

export const MyConferences = (props) => {

    const classes = useStyles();
    const [mounted, setMounted] = useState(true)
    const [conferences, setConferences] = useState(null)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')

    useEffect(() => {
        if (mounted) {
            loadConferences()
        }

        return () => {
            setMounted(false)
        }
    }, [mounted])

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return

        setOpen(false)
    }

    const loadConferences = async () => {
        const res = await api.loadConferencesBySpeaker(localStorage.getItem('token'))
        setConferences(res.conferences)
    }

    const toggleState = async (id, state) => {
        let prevState
        if (state === 1) prevState = 0
        if (state === 0) prevState = 1
        let data = {
            state: prevState
        }
        const res = await api.editConference(data, localStorage.getItem('token'), id)
        if (!res.success) {
            setVariant('error')
            setMessage(res.error)
        } else {
            setVariant('success')
            setMessage(res.message)
        }

        setOpen(true)
        loadConferences()
    }

    const view = (id) => {
        props.history.push('/view/' + id)
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
                            <CardActions>
                                <Button
                                    size="small"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => toggleState(conference.id, conference.state)}
                                >
                                    {conference.state === 1 ? "Disabled" : "Activated"}
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => view(conference.id)}
                                >
                                    <RemoveRedEye />
                                </Button>
                            </CardActions>
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