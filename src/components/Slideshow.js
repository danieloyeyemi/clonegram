import React, { useState } from "react";
import { Slide } from "react-slideshow-image";
import './style/style.css'
import 'react-slideshow-image/dist/styles.css';
import pic1 from '../asset/image/pic1.jpg';
import animal from '../asset/image/animal.jpg'
import animal2 from '../asset/image/animal2.jpg'
import animal3 from '../asset/image/animal3.jpg'

const Slideshow = () => {
  const style = {
    
    background: 'white',
    padding: '10px 0',
  };

  const properties = {
    duration: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    indicators: true,
    responsive: [
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
  };

  return (
    <div className="shadow-sm">
        <Slide {...properties}>
          <div><img src={pic1} className="rounded-circle mx-lg-5 mx-md-3 mt-4" alt="pic1" style={{ width: '50px', height: '50px', cursor: 'pointer' }}/></div>
          <div><img src={animal} className="rounded-circle mx-lg-5 mx-md-3 mt-4" alt="pic2" style={{ width: '50px', height: '50px', cursor: 'pointer' }}/></div>
          <div><img src={animal2} className="rounded-circle mx-lg-5 mx-md-3 mt-4" alt="pic3" style={{ width: '50px', height: '50px', cursor: 'pointer' }}/></div>
          <div><img src={animal3} className="rounded-circle mx-lg-5  mx-md-3 mt-4" alt="pic4" style={{ width: '50px', height: '50px', cursor: 'pointer' }}/></div>
        </Slide>
      </div>
  );
};

export default Slideshow;
