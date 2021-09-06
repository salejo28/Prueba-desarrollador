import React, { useEffect, useState } from 'react'
import {
    Container,
    Card,
    CardContent,
    Typography,
    makeStyles
} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { api } from '../services/Api'

export const ViewConference = () => {

    const classes = useStyles();
    const { conference_id } = useParams()
    const [mounted, setMounted] = useState(true)
    const [attendants, setAttendants] = useState(null)

    useEffect(() => {
        if (mounted) {
            loadAttendants()
        }

        return () => {
            setMounted(false)
        }
    }, [mounted])

    const loadAttendants = async () => {
        const res = await api.loadAttendantsInConference(conference_id, localStorage.getItem('token'))
        setAttendants(res.attendants)
    }

    return (
        <Container maxWidth="sm">
            {
                attendants !== null && attendants.map(attendant => {
                    return (
                        <Card key={attendant.id} className={classes.mar}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {attendant.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Name: {attendant.name}
                                    <br />
                                    Email: {attendant.email}
                                </Typography>
                            </CardContent>                            
                        </Card>
                    )
                })
            }
            {
                (attendants === null || attendants.length === 0) && (
                    <Typography>
                        No attendants
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