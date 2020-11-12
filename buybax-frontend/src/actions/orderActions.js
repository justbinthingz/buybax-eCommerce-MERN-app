import {
    ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST,
    ORDER_MY_LIST_FAIL, ORDER_MY_LIST_SUCCESS, ORDER_MY_LIST_REQUEST,

} from '../constants/orderConstants'
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //when we are sending data we want to send content type in header, where we send tokens
        const config = {
            headers: {
                'Content-Type': 'appliction/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log("here creating order", typeof order)
        //here user data that we wanna update is being passed
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //when we are sending data we want to send content type in header, where we send tokens
        const config = {
            headers: {
                'Content-Type': 'appliction/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log("here creating order", typeof order)
        //here user data that we wanna update is being passed
        const { data } = await axios.get('/api/orders/' + id, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //when we are sending data we want to send content type in header, where we send tokens
        const config = {
            headers: {
                'Content-Type': 'appliction/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log("here creating order", typeof order)
        //here user data that we wanna update is being passed
        const { data } = await axios.put('/api/orders/' + orderId + '/pay', paymentResult, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: ORDER_PAY_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const myListOrders = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_MY_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //when we are sending data we want to send content type in header, where we send tokens
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        //here user data that we wanna update is being passed
        const { data } = await axios.GET('/api/orders/myorders', config)
        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: ORDER_MY_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}