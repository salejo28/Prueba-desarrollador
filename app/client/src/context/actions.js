import jwtDecode from 'jwt-decode';
import { api } from '../services/Api'

export async function loginUser(dispatch, loginPayload) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        const res = await api.login(loginPayload)

        if (res.success) {
            const decode = jwtDecode(res.token)
            dispatch({ type: 'LOGIN_SUCCESS', payload: { decode, jwt: res.token } });
            localStorage.setItem('token', res.token);
            localStorage.setItem('currentUser', JSON.stringify(decode))
            return res
        }

        dispatch({ type: 'LOGIN_ERROR', error: res.errors });
        return res;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    /* localStorage.removeItem('currentUser'); */
    localStorage.removeItem('token');
}