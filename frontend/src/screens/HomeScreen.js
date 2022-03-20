import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import SearchBox from '../components/SearchBox';
import { Container, Carousel } from 'react-bootstrap';

// import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <Container>
        <Carousel fade interval={1000} variant="dark" controls={false} indicators={false}>
          <Carousel.Item>
            <img className="d-block w-100" src="images/geo.jpg" alt="Geospatial" />
            <Carousel.Caption>
              <h3>GEOSPATIAL</h3>
              </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                  <img className="d-block w-100" src="images/ict.jpg" alt="ICT" />
                  <Carousel.Caption>
              <h3>ICT</h3>
              </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                  <img className="d-block w-100" src="images/eng.jpg" alt="Engineering" />
                  <Carousel.Caption>
              <h3>Engineering</h3>
              </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Container>
          <Container>
            <hr class="green" />
            <h2>Products</h2>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <div>
                  <SearchBox />
                </div>

                {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                </div>
              </>
            )}
          </Container>
        </div>
        );
}
