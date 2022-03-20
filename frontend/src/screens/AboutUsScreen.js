import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';


export default function AboutUsScreen() {


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
            <p className="legend">ICT-Cafe</p>
          </div>
          <div className='corouseldiv'>
            <img className="fill" src="images/eng.jpg" alt="" />
            <p className="legend">Engineering</p>
          </div>
        </Carousel>
      </div>
      <hr class="green" />
      <div className="servicebox">
        <ul className="services">
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
      <hr class="green" />
      <div>
        <h1>
          Our Office Address:
        </h1><br/>
        <p>
          No. 13 Doho Plaza, Adjacent Tunfure Police Station Gombe
        </p>
      </div>
    </div>
  );
}
