import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import ListGroupItem from '../../node_modules/react-bootstrap/esm/ListGroupItem';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { Col, Row, Form, ListGroup, Button } from 'react-bootstrap'

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
    <Col >
      <Row>
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go to our product</Link>
          </MessageBox>
        ) : (
          <Col>
            {cartItems.map((item) => (
              <Col key={item.product}>
                <div className="row">
                  <Col>
                    <img
                    style={{ width: '5rem'}}
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </Col>
                  <Col >
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col>
                    <Form.Select
                    style={{ width: '10rem'}}
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
                    <div>N{item.price}</div>
                  </Col>
                  
                  <Col>
                    <Button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </Button>
                  </Col>
                </div>
              </Col>
            ))}
          </Col>
        )}
      </Row>
      <Row >
        <div>
          <ListGroup>
            <ListGroupItem>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : N
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </ListGroupItem>
            <ListGroup.Item>
              <Button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Row>
    </Col>
  );
}
