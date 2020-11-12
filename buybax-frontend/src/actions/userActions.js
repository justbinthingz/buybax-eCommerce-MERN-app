import axios from "axios"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_RESET, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"
import { ORDER_MY_LIST_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        //when we are sending data we want ot send content type in header, where we send tokens
        const config = {
            headers: {
                'Content-Type': 'appliction/json'
            }
        }
        const { data } = await axios.post('/api/user/login', { email, password, config })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        //when we are sending data we want ot send content type in header, where we send tokens
        const config = {
            headers: {
                'Content-Type': 'appliction/json'
            }
        }
        const { data } = await axios.post('/api/user', { name, email, password, config })
        console.log("registred now", data)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const logout = () => (dispatch) => {
    console.log("here loggin out")
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
    dispatch({
        type: ORDER_MY_LIST_RESET
    })
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //when we are sending data we want ot send content type in header, where we send tokens
        const config = {
            headers: {
                'Content-Type': 'appliction/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //here id could be profile too
        const { data } = await axios.get('/api/user/' + id, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //when we are sending data we want ot send content type in header, where we send tokens
        const config = {
            headers: {
                'Content-Type': 'appliction/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log("here")
        //here user data that we wanna update is being passed
        const { data } = await axios.put('/api/user/profile', user, config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

