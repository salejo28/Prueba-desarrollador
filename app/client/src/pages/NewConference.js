import React, { useState } from 'react'
import {
    Container,
    CssBaseline,
    makeStyles,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Grid,
    Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { onlyNumber } from '../utils/utils';
import { api } from '../services/Api';

export const NewConference = (props) => {
    const classes = useStyles();
    const [state, setState] = useState(1)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [quota, setQuota] = useState(0)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')

    const onChange = e => {
        const { name, value } = e.target
        if (name === "name") setName(value)
        if (name === "location") setLocation(value)
        if (name === "date") setDate(value)
        if (name === "quota") setQuota(parseInt(value))
        if (name === "state") setState(value)
    }

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return

        setOpen(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            name,
            location,
            date,
            quota,
            state
        }

        const res = await api.newConference(data, localStorage.getItem('token'))
        if (!res.success) {
            setVariant('error')
            setMessage(res.error)
            setOpen(true)
            setLoading(false)
            return
        }

        setVariant('success')
        setMessage(res.message)
        setOpen(true)
        setTimeout(() => {
            props.history.push('/my-conferences')
        }, 2000)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    New Conferrence
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Conference (name)"
                        name="name"
                        autoComplete="off"
                        type="text"
                        autoFocus
                        onChange={onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="location"
                        label="Location"
                        type="text"
                        id="location"
                        autoComplete="off"
                        onChange={onChange}
                    />
                    <TextField
                        id="date"
                        label="Date"
                        name="date"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={onChange}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl style={{ marginTop: 20, width: '100%' }}>
                                <InputLabel id="state">State</InputLabel>
                                <Select
                                    style={{ padding: '0px 10px' }}
                                    labelId="state"
                                    id="state-select"
                                    value={state}
                                    onChange={onChange}
                                    name="state"
                                >

                                    <MenuItem value={0}>
                                        Disabled
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        Active
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="quota"
                                label="Quota"
                                name="quota"
                                autoComplete="off"
                                type="text"
                                autoFocus
                                onChange={onChange}
                                onKeyPress={e => onlyNumber(e)}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                            disabled={loading}
                        >
                            Create
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </form>
            </div>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity={variant}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: 'none',
        color: "#2a9d8f"
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -9,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    textField: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
}));