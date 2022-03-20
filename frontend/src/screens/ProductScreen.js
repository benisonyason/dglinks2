import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { Container, Col, Row, ListGroup, Button, Form } from 'react-bootstrap';

export default function ProductScreen(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <Container>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Col>
          <Link to="/">Back to result</Link>
          <Row>
            <Row >
              <img
              className='small'
                src={product.image}
                alt={product.name}
              ></img>
            </Row>
            <Row>
              <ListGroup>
                <ListGroup.Item>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price : N{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Row>
            <Row>
              <div >
                <ListGroup>
                  <ListGroup>
                    {' '}
                    <h4>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h4>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                  </ListGroup>
                  <ListGroup>
                    <div>
                      <div>Price</div>
                      <div className="price">N {product.price}</div>
                    </div>
                  </ListGroup>
                  <ListGroup>
                    <div>
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </ListGroup>
                  {product.countInStock > 0 && (
                    <>
                      <ListGroup>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <Form.Select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </div>
                        </div>
                      </ListGroup>
                      <ListGroup>
                        <Button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </Button>
                      </ListGroup>
                    </>
                  )}
                </ListGroup>
              </div>
            </Row>
          </Row>
          <Row>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ListGroup>
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                {userInfo ? (
                  <Form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <Form.Label htmlFor="rating">Rating</Form.Label>
                      <Form.Select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </Form.Select>
                    </div>
                    <div>
                      <Form.Label htmlFor="comment">Comment</Form.Label>
                      <Form.Control as="textarea"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </div>
                    <div>
                      <label />
                      <Button className="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </Form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>
      )}
    </Container>
  );
}
