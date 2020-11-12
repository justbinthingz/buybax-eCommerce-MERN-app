import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import axios from 'axios';
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {

    // we doing it form redux
    // const [products, setProducts] = useState([])

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, products, error } = productList

    useEffect(() => {
        // const fetchProducts = async () => {
        //     // destructuring to get the "data" from response directly
        //     const { data } = await axios.get('/api/products')
        //     setProducts(data) // change nd add the state
        // }

        // fetchProducts()

        dispatch(listProducts())
        console.log("use eff")
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>error...{error}</Message> :
                <Row>
                    {products.map(product => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        )
                    })}
                </Row>}

        </>
    )
}

export default HomeScreen
