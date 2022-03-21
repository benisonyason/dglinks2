import Axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';
import { Row, Col, Button, ListGroup } from 'react-bootstrap'

export default function OrderScreen(props) {
  const params = useParams();
  const { id: orderId } = params;

  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className='content'>
      <h5>Order {order._id}</h5>
      <Row >
        <Col>
          <Row>
            <Col sm={8}>
              <ListGroup>
                <div className="card card-body">
                  <h3>Address</h3>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                    <strong>Address: </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                </div>
              </ListGroup>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
              <div className='card card-body'>
                <h2>Order Items</h2>
                {order.orderItems.map((item) => (
                  <div key={item.product}>
                    <Row>
                      <Col sm={2}>
                        <img
                          style={{ maxWidth: '50px' }}
                          src={item.image}
                          alt={item.name}
                          className="small"
                        ></img>
                      </Col>
                      <Col sm={4}>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>

                      <Col sm={4}>
                        {item.qty} x N{item.price} = N{item.qty * item.price}
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Col>
            <Col sm={4}>
              <h2>Order Summary</h2>
              <ListGroup.Item>
                <div>
                  <div>Items</div>
                  <div>N{order.itemsPrice.toFixed(2)}</div>
                </div>
              </ListGroup.Item>
              <ListGroup>
                <div className="row">
                  <strong>Tax</strong>
                  <div>N{order.taxPrice.toFixed(2)}</div>
                </div>
              </ListGroup>
              <ListGroup>
                <div className="row">
                  <div>
                    <strong> Total Price</strong>
                  </div>
                  <div>
                    <strong>N{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </ListGroup>
              {!order.isPaid && (
                <ListGroup>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PaystackButton
                        publicKey='pk_live_c2933c52cbe3a4255fcfa0389a70b88482452eb4'
                        email="user@example.com"
                        text='PayNow'
                        amount={order.totalPrice * 100}
                        onSuccess={successPaymentHandler}
                      />
                    </>
                  )}
                </ListGroup>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <Button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </Button>
                </ListGroup>
              )}
            </Col>

          </Row>
        </Col>

      </Row>
    </div>
  );
}
