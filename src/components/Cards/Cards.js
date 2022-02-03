import React from "react";
import Style from "./Cards.module.css";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  Typography,
  IconButton,
  Slide
} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import {useSnackbar } from 'notistack';


import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux" 
import {UpdateRecipeID} from "../../store/action/recipeId"


const Cards = ({ Data }) => {


  // snackbar element >>>

  const [save,setSave] = React.useState(true)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); // get snackbar

  const action = key =>(
    <React.Fragment>
      <IconButton onClick={()=>{closeSnackbar(key)}} sx={{color:"#ffff"}} >
      < CloseRoundedIcon />
      </IconButton>
    </React.Fragment>
  )

  let successMsg = "successfully saved recipe";
  let warningMsg = "unsaved recipe";
  
  const handleSnackbar = (type) => ()=>{
    setSave(state => !state )

    enqueueSnackbar( save ? successMsg : warningMsg,
    {
      variant: save ? type : "warning",
      TransitionComponent:Slide, // slide animation from mui
      action, // close icon for close snackbar
    },
    )
  }

  // getID => Update Recipe Id when click Card Image or Title >>>
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const getID = (event) => { 
      console.log(event.target.id)
      dispatch(UpdateRecipeID(event.target.id))
      navigate('/recipes', { replace: true })
    };

  return (
    <>
      {Data.map((data) => {
        return (
          <Card d sx={{ maxWidth: 345 }} key={data.id}>
            <CardActionArea>
              <CardMedia component="img" height="140" image={data.image} sx={{cursor:"pointer"}} alt={data.title} id={data.id} onClick={getID} />
            </CardActionArea>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{cursor:"pointer",fontWeight:"bold"}} fontFamily={'Lora'} id={data.id} onClick={getID} >{data.title}</Typography>
              <Typography variant="body2" color="text.secondary" className={Style.summary} dangerouslySetInnerHTML={{__html: [data.summary] }} />
            </CardContent>

            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small" onClick={handleSnackbar("success")} >SAVE</Button>
            </CardActions>

          </Card>
        );
      })}
    </>
  );
};

export default Cards;
