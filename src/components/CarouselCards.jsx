import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack'
//import Test from '../components/Test'
import Detail from "../components/Detail";
import { useState } from "react";

export default  function CarouselCards (){
  const [detailId, setDetailId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

    return (
      <Carousel variant="dark">
        <Carousel.Item style={{ height: 400 }}>
        <Stack
          direction="horizontal"
          className="h-100 justify-content-center align-items-center"
          gap={3}>
          </Stack>
        </Carousel.Item>
        <Carousel.Item style={{ height: 400 }}>
        <Stack
          direction="horizontal"
          className="h-100 justify-content-center align-items-center"
          gap={3}>
          <Detail
          id={detailId}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          />
          </Stack>
        </Carousel.Item>
      </Carousel>
    );
  }
  




    

    
        
