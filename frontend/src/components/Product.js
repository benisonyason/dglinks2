import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Stack, CardGroup, Card } from "react-bootstrap";

export default function Product(props) {
  const { product } = props;
  return (
    <Stack gap={5} className="col-md-5 mx-auto">
      <CardGroup >
        <Card key={product._id} style={{ alignItems: 'center', maxWidth: 'auto', display: 'flex'}}>
          <Link to={`/product/${product._id}`}>
            <Card.Img  src={product.image} alt={product.name} style={{ maxHeight: 'auto', auto: '100px' }}/>
          </Link>
          <Card.Footer>
            <Card.Title>
            <Link to={`/product/${product._id}`}>
              <h4>{product.name}</h4><br/>
              <h6>{product.category}</h6>
            </Link>
            </Card.Title>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
            <div className="row">
              <div className="price">N{product.price}</div>
              <div>
                <Link to={`/seller/${product.seller._id}`}>
                  {product.seller.seller.name}
                </Link>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </CardGroup>
    </Stack>
  );
}
