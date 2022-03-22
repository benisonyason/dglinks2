import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap'


export default function AboutUsScreen() {


  return (
    <Row className="content">
      <Col sm={6}>
        <Carousel autoPlay={true} autoFocus={true} showArrows={false} showThumbs={false}
        >
          <div className='corouseldiv'>
            <img className="fill" src="images/geo.jpg" alt="" />
            <p className="legend">GEOSPATIAL</p>
          </div>
          <div className='corouseldiv'>
            <img className="fill" src="images/ict.jpg" alt="" />
            <p className="legend">ICT-Cafe</p>
          </div>
          <div className='corouseldiv'>
            <img className="fill" src="images/eng.jpg" alt="" />
            <p className="legend">Engineering</p>
          </div>
        </Carousel>
      </Col>
      <Col sm={3}>
        <hr />
        <div className='card'>
          <ul >
            <div className='servicesLabel'>
              <strong>Our Services</strong>
            </div>
            <Link to="/">
              <li>Geospatial</li>
            </Link>
            <Link to="/">
              <li>ICT</li>
            </Link>
            <Link to="/">
              <li>Engineering </li>
            </Link>
          </ul>
        </div>
      </Col>
      <Col sm={3}>
        <hr class="green" />
        <div className='card'>
          <h1>
            Our Office Address:
          </h1><br />
          <p>
            No. 13 Doho Plaza, Adjacent Tunfure Police Station Gombe
          </p>
        </div>
      </Col>
    </Row>
  );
}
