import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'


export const addToCart = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get('/api/products/' + id)
    console.log("here adding", data)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    console.log("state", getState().cart.cartItems)
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//takes in the form data
export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(getState(data)))
}


//takes in the form data
export const savePaymentMethod = (data) => (dispatch, getState) => {
    console.log("data in disoatch - paymentMehtod", data)
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(getState(data)))
}