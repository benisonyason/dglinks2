import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Col, Row, Button } from 'react-bootstrap';

export default function PaymentMethodScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    navigate('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  return (
    <Col sm={3}>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Form onSubmit={submitHandler}>
        <div>
          <h3>Payment Method</h3>
        </div>
        <Row>
          <div>
            <Form.Check
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              label={`Paystack`}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
        </Row>
        <Row>
          <div>
            <Form.Check
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              label={`Stripe`}
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
        </Row>
        <Row>
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Row>
      </Form>
    </Col>
  );
}
