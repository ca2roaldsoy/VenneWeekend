import React, {useEffect, useState, useRef, forwardRef} from 'react'
import axios from 'axios';
import { CarouselItem, Figure, Image } from 'react-bootstrap';

function ImgCarousel({props}) {
  console.log(props);
    //const inputRef = forwardRef();
    //const [data, setData] = useState([]);



  /* useEffect(() => {
        axios.get("http://localhost:3001/media")
      .then(res =>  setData(res.data))
      .catch(err => console.log(err))
    }, [])  */

 /*  function carouselImg() {
    const images = []
    for(let i=0; i < data.length; i++) {
        const image = data[i];

        if(i >= 3) {
            break;
        } else {
            images.push(
                <Carousel.Item
                className="carousel__figure"
                role="figure"
                aria-labelledby="caption"
                key={i}
                ref={ref}
              >
                <img
                  className="d-block w-100"
                  src={"http://localhost:3001/images/"+image.image}
                  alt={"bilde" + i}
                  ref={ref}
                />
              </Carousel.Item>
            )
        }
    }
    return images;
  }
  
   */
  //console.log(data);
  return (
             <CarouselItem
                className="carousel__figure"
                role="figure"
                /* ref={ref} */
               
              >
                {/* <img src={"http://localhost:3001/images/"+imgSrc} alt="" /> */}
            </CarouselItem>
  )
}

export default ImgCarousel;