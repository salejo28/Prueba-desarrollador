import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Container,
    CssBaseline,
    makeStyles,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { LockOutlined } from '@material-ui/icons'
import { api } from '../services/Api'
import { capitalizeFirstLetter, CheckEmail } from '../utils/utils'

export const Register = (props) => {
    const classes = useStyles();
    const [roles, setRoles] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(0)
    const [errors, setErrors] = useState({
        path: [],
        message: ""
    })
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(true)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')

    useEffect(() => {
        if (mounted) {
            loadRoles()
        }

        return () => {
            setMounted(false)
        }
    }, [mounted])

    const loadRoles = async () => {
        const res = await api.roles()
        setRoles(res.roles)
    }

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return

        setOpen(false)
    }

    const onChange = (e) => {
        const { value, name } = e.target
        if (name === "name") setName(value)
        if (name === "email") setEmail(value)
        if (name === "password") setPassword(value)
        if (name === "role") setRole(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (name === '' && email === '' && password === '') {
            setErrors({
                path: ["name", "email", "password"],
                message: "This field is required!"
            })
            return
        }
        if (password.length < 6) {
            setErrors({
                path: ["password"],
                message: "Password must be six characters or longe"
            })
            return
        }

        if (!CheckEmail(email)) {
            setErrors({
                path: ["email"],
                message: "Invalid email!"
            })
            return
        }

        if (role === 0) {
            setVariant("error")
            setMessage("The role is required!")
            setOpen(true)
            return
        }
        setLoading(true)
        let data = {
            name,
            email,
            password,
            role
        }
        const res = await api.register(data)
        if (!res.success) {
            setErrors(res.errors)
            setLoading(false)
            return
        }
        setName('')
        setEmail('')
        setPassword('')
        setRole(0)
        setVariant("success")
        setMessage(res.message)
        setOpen(true)
        setTimeout(() => {
            props.history.push("/")
        }, 2500)
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        error={errors.path.includes("name")}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="off"
                        helperText={errors.path.includes("name") && errors.message}
                        autoFocus
                        onChange={onChange}
                    />
                    <TextField
                        error={errors.path.includes("email")}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        helperText={errors.path.includes("email") && errors.message}
                        onChange={onChange}
                    />
                    <TextField
                        error={errors.path.includes("password")}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        helperText={errors.path.includes("password") && errors.message}
                        onChange={onChange}
                    />
                    <FormControl style={{ marginTop: 20 }}>
                        <InputLabel id="role">Role</InputLabel>
                        <Select
                            style={{ padding: '0px 10px' }}
                            labelId="role"
                            id="role-select"
                            value={role}
                            onChange={onChange}
                            name="role"
                        >   

                            <MenuItem value={0}>
                                <em>None</em>
                            </MenuItem>
                            {
                                roles.map(role => {
                                    return (
                                        <MenuItem
                                            key={role.id}
                                            value={role.id}>
                                            {capitalizeFirstLetter(role.name)}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <div className={classes.wrapper}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <Grid container>
                        <Grid item>
                            <Link to="/" variant="body2" className={classes.link}>
                                {"Have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
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
}));