import React, { useState } from 'react'
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
    CircularProgress
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { loginUser, useAuthDispatch } from '../context'
import { CheckEmail } from '../utils/utils'

export const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        path: [],
        message: ""
    })
    const [loading, setLoading] = useState(false)
    const dispacth = useAuthDispatch()
    const onChange = (e) => {
        const { value, name } = e.target
        if (name === "email") setEmail(value)
        if (name === "password") setPassword(value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (email === '' && password === '') {
            setErrors({
                path: ["email", "password"],
                message: "This field is required!"
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
        setLoading(true)
        let data = {
            email,
            password
        }
        try {
            const res = await loginUser(dispacth, data)
            if (!res.success) {
                setErrors(res.errors)
                setLoading(false)
                return
            }
            setEmail('')
            setPassword('')
            setLoading(false)
            props.history.push('/conferences')
        } catch (error) {
            console.log(error)
        }
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
                        error={errors.path.includes("email")}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        autoFocus
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
                            Sign In
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <Grid container>
                        <Grid item>
                            <Link to="/register" variant="body2" className={classes.link}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
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