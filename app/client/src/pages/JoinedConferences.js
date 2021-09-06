import React, { useEffect, useState } from 'react'
import {
    Container,
    Card,
    CardContent,
    Typography,
    makeStyles,
    Button
} from '@material-ui/core'
import { api } from '../services/Api'
import { formatDate } from '../utils/utils'

export const JoindeConferences = (props) => {
    const classes = useStyles();
    const [conferences, setConferences] = useState(null)
    const [mounted, setMounted] = useState(true)

    useEffect(() => {
        if (mounted) {
            loadConferences()
        }

        return () => {
            setMounted(false)
        }
    },[mounted])

    const loadConferences = async () => {
        const res = await api.loadJoinedConferences(localStorage.getItem('token'))
        setConferences(res.conferences)
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
                                </Typography>
                            </CardContent>
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