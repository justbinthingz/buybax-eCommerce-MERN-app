import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading) {
        //calculating all prices  
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)) // second paramm is the start of the accumulator in this reduce func
    }

    // to make sure id in the url matches the orderID
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            console.log("adding script", clientId)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`
            script.async = true
            script.onload = () => {
                console.log("i am loaded")
                setSdkReady(true)
                console.log("setSdkReady ?", sdkReady)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay) {
            console.log("i am here in if succPay")
            dispatch({ type: ORDER_PAY_RESET }) // if we dont do this then once we pay, its gonna keep refreshing
            dispatch(getOrderDetails(orderId))
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            }
            else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay])

    const successPaymentHandler = (paymentResult) => {
        console.log("obj", order)
        console.log("here sucees payemt handl;er", paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    console.log("orderscreen", sdkReady)

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
        <>
            <h1> Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup.Item variant="flush">
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                            <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}

                    </ListGroup.Item>

                    <ListGroup.Item variant="flush">
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item variant="flush">
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Your order is Empty</Message> : (
                            <ListGroup.Item variant="flush">
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>

                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup.Item>
                        )}
                    </ListGroup.Item>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} currency="INR"
                                            onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
}

export default OrderScreen
