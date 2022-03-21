import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Col, Row, Button, Stack } from 'react-bootstrap';


export default function ShippingAddressScreen(props) {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    navigate('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      navigate('/payment');
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    navigate('/map');
  };
  return (
    <div className='content'>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Form onSubmit={submitHandler}>
        <Row>
          <Row>
            <h3>Cutomer Details</h3>
          </Row>
          <Col sm={2}>

            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Label htmlFor="address">Address</Form.Label>
            <Form.Control
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Label htmlFor="city">City</Form.Label>
            <Form.Control
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Label htmlFor="postalCode">Postal Code</Form.Label>
            <Form.Control
              type="text"
              id="postalCode"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Label htmlFor="country">Country</Form.Label>
            <Form.Control
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Col>
          <Stack gap={3}>
            <Col sm={2}>
              <Form.Label htmlFor="chooseOnMap">Location</Form.Label>
              <Button variant="primary" type="submit" onClick={chooseOnMap} disabled>
                Choose On Map
              </Button>
            </Col>
            <Col sm={2}>
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </Col>
          </Stack>
        </Row>
      </Form>
    </div>
  );
}
