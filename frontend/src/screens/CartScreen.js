import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import ListGroupItem from '../../node_modules/react-bootstrap/esm/ListGroupItem';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { Col, Row, Form, ListGroup, Button, Card } from 'react-bootstrap'

export default function CartScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <Row >
      <h1> Cart</h1>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {cartItems.length === 0 ? (
        <MessageBox>
          Cart is empty. <Link to="/">Go to our product</Link>
        </MessageBox>
      ) : (
        <Col sm={8}>
          {cartItems.map((item) => (
            <Col sm={6} key={item.product}>
              <Card >
                <Row>
                  <Col>
                    <img
                      style={{ maxWidth: '50px' }}
                      src={item.image}
                      alt={item.name}
                    ></img>
                  </Col>
                  <Col >
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col>
                    <Form.Select
                      style={{ width: '4rem' }}
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                    <h7>N{item.price}</h7>
                  </Col>
                  <Col>
                    <Button
                      size="sm"
                      variant="primary"
                      type="submit"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Col>
      )}
      <Col sm={4}>
        <Card>
          <ListGroup>
            <ListGroupItem>
              <h6>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : N
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h6>
            </ListGroupItem>
            <ListGroup.Item>
              <Button
                size="sm"
                variant="primary"
                type="button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
