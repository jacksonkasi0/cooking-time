import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux" 
import {UpdateRecipeID} from "../../store/action/recipeId"



// import Lazy load image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay, Keyboard } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Divider, Typography } from "@mui/material";
import Style from "./SwiperCard.module.css";



SwiperCore.use([Pagination, Navigation, Autoplay, Keyboard]); // install Swiper modules

// https://api.spoonacular.com/recipes/357764/similar?&apiKey=0c86a429c6d14d0885cd6787c53a6c1f

const SwiperCard = ({ Data }) => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  if (Data.length === 0) { // if Data.length === 0,  it's don't Show Swiper Card
    return null;
  };
  
  const getID = (event) => { // get Swiper Card recipe id
    dispatch(UpdateRecipeID(event.target.id))
    navigate('/recipes', { replace: true })
  };

    return (
      <Swiper
      loop={true} 
      pagination={{ clickable: true }}
      navigation={true} 
      className={Style.mySwiper}
      autoplay={{
        delay:2500,
        disableOnInteraction:false,
      }}
      keyboard={{enabled:true}}

      breakpoints={{ // breackpoint for receponsive swiper cards
          0:{
            slidesPerView:2,
            slidesPerGroup:2,
            spaceBetween:2,
            loop:false,
            pagination:false, // remove pagination
            centeredSlides:true, // make slide at centered
          },
          450:{
            slidesPerView:3,
            slidesPerGroup:3,
            spaceBetween:5,
            loop:false,
            pagination:false,
            centeredSlides:true,

          },
          510:{
            slidesPerView:2,
            slidesPerGroup:2,
          },
          800:{
            slidesPerView:3,
            slidesPerGroup:3,
          },
          1080:{
            slidesPerView:4,
            slidesPerGroup:4,
          },
          1300:{
            slidesPerView:5,
            slidesPerGroup:5
          }
      }}
    >
      { 
      Data.map((item) => {
        return (
            <SwiperSlide className={Style.swiper_slide} key={item.id} id={item.id} onClick={getID} >
              <LazyLoadImage effect="blur" id={item.id} src={"https://spoonacular.com/recipeImages/" +item.id +"-312x150." +item.imageType}/>
              <div id={item.id} style={{ position: "relative", margin: "6px 6px 6px 0", width: "100%", }}>
                <Typography id={item.id}  className={Style.title} variant="h7" sx={{ fontWeight: "bold", fontSize: "13px" }}>{item.title}</Typography>
                <Typography id={item.id}  className={Style.time}>{item.readyInMinutes} minutes</Typography>
              </div>
              <Divider orientation="vertical" />
            </SwiperSlide>
        );
      })}
    </Swiper>
   )
};

export default SwiperCard;
