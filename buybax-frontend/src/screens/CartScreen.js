import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id //getting productid from url

    const qty = location.search ? Number(location.search.split('=')[1]) : 1 // to get whatever is after ? in the url

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    useEffect(() => {
        //we only wanna add to cart if there is a product-id, and if we just go-to cart page(w/o products just to check the page) then we don't want to
        if (productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, productId, qty])

    const removeFromCartHandler = (itemId) => {
        dispatch(removeFromCart(itemId))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }


    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link> </Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => {
                            return (<ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>{item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x => {
                                                    return (<option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>)
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>)
                        })}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal {cartItems.reduce((acc, currItem) => acc + currItem.qty, 0)} items</h2>
                            ${cartItems.reduce((acc, currItem) => acc + currItem.qty * currItem.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Check out</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            <Col md={2}></Col>
        </Row>
    )
}

export default CartScreen
