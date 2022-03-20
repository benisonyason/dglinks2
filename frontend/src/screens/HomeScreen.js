import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import SearchBox from '../components/SearchBox';

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
      <div>
        <Carousel autoPlay={true} autoFocus={true} showArrows={false} showThumbs={false}
        >
          <div className='corouseldiv'>
            <img className="fill" src="images/geo.jpg" alt="" />
            <p className="legend">GEOSPATIAL</p>
          </div>
          <div className='corouseldiv'>
            <img className="fill" src="images/ict.jpg" alt="" />
            <p className="legend">ICT</p>
          </div>
          <div className='corouseldiv'>
            <img className="fill" src="images/eng.jpg" alt="" />
            <p className="legend">Engineering</p>
          </div>
        </Carousel>
      </div>
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
    </div>
  );
}
