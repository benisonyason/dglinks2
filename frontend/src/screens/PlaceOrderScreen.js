import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Row, Col, Button, ListGroup, Card, Stack } from 'react-bootstrap';

export default function PlaceOrderScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100000 ? toPrice(0) : toPrice(0);
  cart.taxPrice = toPrice(0.075 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
          <Col sm="6">
            <ListGroup>
              <Stack gap={2}>
                <Card>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                    ,{cart.shippingAddress.country}
                  </p>
                </Card>
                <Card >
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </Card>
                <Card>
                  <h4>Order Items</h4>
                  {cart.cartItems.map((item) => (
                    <Card key={item.product}>
                      <Row >
                        <Col>
                          <img
                            style={{ maxWidth: '50px' }}
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col>
                          {item.qty} x N{item.price} = N{item.qty * item.price}
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Card>
              </Stack>
            </ListGroup>
          </Col>
          <Col sm={5}>
            <Card>
              <ListGroup>
                  <h2>Order Summary</h2>
                  <Row >
                    <h5>Items Price</h5>
                    <div>N{cart.itemsPrice.toFixed(2)}</div>
                    <h5>VAT</h5>
                    <div>N{cart.taxPrice.toFixed(2)}</div>
                  </Row>
                  <Row >
                      <strong> Order Total</strong>
                      <strong>= N{cart.totalPrice.toFixed(2)}</strong>
                  </Row>
                  <Button
                  variant='primary'
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </Button>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
              </ListGroup>
            </Card>
          </Col>
      </Row>
    </div>
  );
}
