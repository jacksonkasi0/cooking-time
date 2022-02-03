import React from "react";
import { Avatar, Box, Chip, Divider, Typography, Button,styled, TextField, ToggleButtonGroup, ToggleButton, IconButton, Slide } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import SwiperCard from "../components/SwiperCard/SwiperCard";
import Style from "./RecipeData.module.css";
// import Sound 
import useSound from 'use-sound'
import HoverSound from  '../assets/sound/rising-pops.mp3'
import PrintSound from  '../assets/sound/print.mp3'
import MarkSound from  '../assets/sound/mark.mp3'
// import lazyloading 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import Rating & icons
import  {Favorite, FavoriteBorder} from '@mui/icons-material'
import Rating from '@mui/material/Rating';
// party effect
import party from "party-js";
// import snackbar 
import {useSnackbar } from 'notistack';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


const RecipeData = ({recipesInfo, similarRecipe}) => {

  

  // snackbar element >>>

  const [save,setSave] = React.useState(true)
  const [bookmark,setBookmark] = React.useState("far")

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
    setBookmark( save ? "fas" : "far")
    play()
    enqueueSnackbar( save ? successMsg : warningMsg,
    {
      variant: save ? type : "warning",
      TransitionComponent:Slide, // slide animation from mui
      action, // close icon for close snackbar
    },
    )}

  // using use-sound when hover or click "Icons & Button" >>>
  const [play] = useSound(HoverSound,{volume:0.5})
  const [print] = useSound(PrintSound,{volume:0.5})
  const [mark] = useSound(MarkSound,{volume:0.5})

  const PlayPrint =()=>{
    print()
    window.print()
  } 
    
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  const [value, setValue] = React.useState(2.5);// rating
  const [hover, setHover] = React.useState(-1);// rating
  const [check,setCheck] = React.useState(true)// make as cooked
  const [tooggleComment, setTooggleComment] = React.useState('All')// comment

  const handleTooggleComment = (event,value)=>{
    setTooggleComment(value)
  }

  const Checked = (e)=>{
    setCheck( (state)=>state===false?true:false)
    if(check){
      mark();
      if(e) setTimeout(() => { //party effect
        party.confetti(e.target, {speed: party.variation.range(600,800)} )   
      },2300)} 
  }

  return (  
    <>
      <Box  className={Style.Page} >

        <Box>
          <Box className={Style.Heading} my={2} textAlign="center" >
            <Divider variant="middle" />
            <Typography variant="h6" fontWeight="bold" mt={2} >MORE FROM SIMILAR COOKING :)</Typography>
          </Box>
        <SwiperCard Data={similarRecipe} className={Style.SwiperCard} />    
        </Box>
    
        <Box className={Style.container} >
           <Box sx={{display:{xs:"block", md:"flex",}, justifyContent:"space-between"}} >
              <Typography className={Style.title} fontFamily={'Lora'} color={"rgb(34,34,34)"} mr={3}  >{recipesInfo.title}</Typography>
              <Box mt={1} mr={0} sx={{display:"flex", gridGap:"10px"}}  className={Style.social} >
                <div style={{height:"40px", borderRadius:"50%"}} onMouseEnter={() => play()}><Avatar  id={Style.avatarM} className={Style.shareAvatar} sx={{bgcolor:"gray[200]"}} ><i className="fas fa-envelope" ></i></Avatar></div>
                <div style={{height:"40px", borderRadius:"50%"}} onMouseEnter={() => play()}><Avatar id={Style.avatarP} className={Style.shareAvatar} sx={{bgcolor:"red"}} ><i className="fab fa-pinterest-p"></i></Avatar></div>
                <div style={{height:"40px", borderRadius:"50%"}} onMouseEnter={() => play()}><Avatar id={Style.avatarF} className={Style.shareAvatar} sx={{bgcolor:"#3E5B9A"}} ><i className="fab fa-facebook-f"></i></Avatar></div>
                <div style={{height:"40px", borderRadius:"50%"}} onMouseEnter={() => play()}><Avatar id={Style.avatarT} className={Style.shareAvatar} sx={{bgcolor:"#249BE3"}} ><i className="fab fa-twitter"></i></Avatar></div>
              </Box>
            </Box> 
      
            <Typography mt={2} variant="h6" fontWeight="bolder" className={Style.from} >By <a href={recipesInfo.sourceUrl} target="_blank" >{recipesInfo.creditsText}</a></Typography>
            <br />
            <Divider/>
      
            <Box mt={4} sx={{display:"flex", justifyContent:"space-between"}} >
              <Box display="block">
                <Typography variant="h6" ><b>YIELD</b>&emsp; {recipesInfo.servings}</Typography>
                <Typography variant="h6" ><b>TIME</b>&emsp;&emsp;{recipesInfo.readyInMinutes} minutes </Typography>
              </Box>
              <Box  sx={{display:"flex", gridGap:"10px"}}  >
                <Button variant="contained"size="small" onClick={handleSnackbar("success")} className={Style.SaveBtn} sx={{bgcolor:"#F22045"}}>
                  <Typography  variant="h6" sx={{display:"flex", alignItems:"center", gridGap:"10px"}} ><i className={`${bookmark} fa-bookmark fa-lg `} ></i> <p>Save to Recipe Box</p></Typography>
                </Button>
                <Button variant="contained" onClick={PlayPrint} className={Style.SaveBtn} sx={{bgcolor:"#F22045"}}>
                  <Typography  variant="h6" ><i className="fas fa-print fa-lg"></i></Typography>
                </Button>
              </Box>
            </Box>
      
            <Box  mt={3} sx={{display:"flex", overflow:"hidden",flexDirection:{xs:"column-reverse",lg:"row"}, justifyContent:"space-between", alignItems:{xs:"center", lg:"unset"} , gridGap:"10px"}} >
              <Typography  width="100%" style={{ fontSize:"1.15em",fontWeight:"200",lineHeight:"1.4" }}  dangerouslySetInnerHTML={{__html: [`&emsp;`+recipesInfo.summary] }} />
              <LazyLoadImage src={recipesInfo.image} alt={recipesInfo.creditsText} effect="blur " />
            </Box>
      
            <br />
            <br />
            <hr  style={{background:"#000", height:"1px"}} />
      
            <Box mt={4} sx={{display:"flex",flexDirection:{xs:"column-reverse", md:"row"}, justifyContent:"space-between", gridRowGap:"10px"}} >
              <Box sx={{display:"flex", flexWrap:"wrap",gridGap:"10px", width:{xs:"100%",md:"60%"} }} > 
                {/* this for Tags */}
                {
                  Object.keys(recipesInfo).slice(0,8).map((key,index)=>{
                    let clipColor;
                    let clipTextColor;
                    let clipIcon;
                    
                    if (recipesInfo[key]){
                      clipColor ="green";
                      clipTextColor="white"
                      clipIcon = <i className="fas fa-check-circle"  style={{color:"white"}} ></i>
                    } 
                    else{
                      clipColor = "light-gray";
                      clipTextColor="#000"
                      clipIcon =<i className="fas fa-times-circle" style={{color:"#000"}}/>
                    }
                    return <Chip label={key} key={index} sx={{bgcolor:clipColor, color:clipTextColor}} icon={clipIcon} />
                  })
              }
              </Box>
              <Box sx={{display:"flex",gridGap:"10px",alignSelf:{xs:"center"},width:{xs:"100%",md:"38%"}}} justifyContent="center" >
               <Box onClick={Checked} sx={{cursor:"pointer"}}  >
                 {
                   check ? <i className="far fa-check-circle"/> : <i class="fas fa-check-circle"/>
                  }
                </Box>
                <Typography>Mark as <b>Cooked</b></Typography>
                <Divider orientation="vertical" style={{height:"20px"}} />
                <Box sx={{display:"flex",flexDirection:"column"}} >
                  <Box sx={{display:"flex", gridColumnGap:"10px"}} >
                      <Typography><b>Rating</b></Typography>
                      <StyledRating sx={{cursor:"pointer"}}
                          name="hover-feedback"
                          value={value}
                          precision={0.5}
                          onChange={(_, newValue) => {setValue(newValue)}}
                          onChangeActive={(_, newHover) => {setHover(newHover)}}
                          icon={<Favorite fontSize="inherit" />}
                          emptyIcon={<FavoriteBorder fontSize="inherit" />}
                        />
                    </Box>
                   {value !== null && (
                  <Box sx={{ mt: 0, alignSelf:"center" }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                  </Box>
              </Box>
            </Box>  
                  
            <br />
            <br />  
            <Divider variant="fullWidth" sx={{backgroundColor:{xs:"gray",md:"lightgray"}}  } />
                  
            <Box sx={{display:"flex", gridGap:"10px", justifyContent:"space-between",flexDirection:{xs:"column",md:"row"}}}>
              <Box sx={{width:{xs:"100%",md:"28%"}, mt:{xs:"0px",md:"60px"}}}  >
                <Typography variant="h5" fontWeight="bold" className={ Style.cookingTitle} >INGREDIENTS</Typography>
                <Box mt={1} > 
                  {
                    recipesInfo.extendedIngredients !== 0 ?
                    recipesInfo.extendedIngredients.map((ingredient)=>{
                      return <Typography mt={1} key={ingredient.original} variant="h6">{ingredient.original}</Typography>
                    })
                    : <Typography variant="h6" fontWeight="bold" textAlign="center" mt={2} >Sorry, there is no data :( </Typography>
                  }
                  </Box>
              </  Box>
                
              <Box mt={2} sx={{width:{xs:"100%",md:"70%"}}} mt="60px" >
                <Typography variant="h5" fontWeight="bold" className={Style.cookingTitle} >PREPARATION</Typography>
                <Box mt={1}> 
                    {
                      recipesInfo.instructions !== null 
                      ?  recipesInfo.analyzedInstructions[0].steps.map((step)=>{
                        return(
                        <Box mt={2} key={step.step} >
                            <Typography variant="h6" fontWeight="bold" >Step {step.number}</Typography>
                           <Typography variant="h6">{step.step}</Typography>
                        </Box>
                        )
                      })
                      : <Typography variant="h6" fontWeight="bold" textAlign="center" mt={2} >Sorry, there is no data :( </Typography>
                    }
                  <br />
                  <br />
                  <Divider variant="fullWidth"/>
                    <br />
                    <br />
                  
                  <Box sx={{padding:"4%",bgcolor:"#000"}} minHeight="80px" maxHeight="280px" >
                      <Typography variant="h5" mb={1} sx={{color:"white"}} fontFamily={'Lora'} >Hungry for more recipes?</Typography>
                      <p style={{color:"white"}}>Get recipes, tips and special offers in your inbox. Opt out or <a href="#" style={{color:"white"}} >contact us</a> anytime. See our <a href="#" style={{color:"white"}} >Privacy Policy</a>.</p>
                      <Box sx={{display:"flex",maxWidth:"400px", margin:"20px auto 0" ,flexDirection:{xs:"column",md:"row"}, gridGap:{xs:"20px",md:"0px"} }}>
                        <TextField  sx={{bgcolor:"#3D3D3D",color:"white"}}  label="Add Your Email" variant="outlined" />
                        <Button variant="contained" color="error" sx={{bgcolor:"#E33D26", color:"white"}} >Sign Up</Button>
                      </Box>
                  </Box>
                  <br />
                  <br />
                  <Box sx={{display:"flex", flexDirection:"column"}} >
                    <Typography variant="h7" fontWeight="bold" mb={1} >COOKING NOTES</Typography>
                    <ToggleButtonGroup color="primary" value={tooggleComment} exclusive
                     onChange={handleTooggleComment} >
                      <ToggleButton value="All" >All</ToggleButton> 
                      <ToggleButton value="Top" >Most Helpful</ToggleButton> 
                        <ToggleButton value="Latest" >Latest</ToggleButton> 
                      </ToggleButtonGroup> 
                  
                    <br />
                    <Divider variant="fullWidth"/>
                    <br />
                    <br />
                    
                    {tooggleComment === "All" ? <Box sx={{height:"110px"}}><Typography variant="h6">All comments, <b>this feature comming soon</b></Typography></Box> : null}
                    {tooggleComment === "Top" ? <Box sx={{height:"110px"}}><Typography variant="h6">Most Helpful or Having High Likes comments, <b>this feature is comming soon</b></Typography></Box> : null}
                    {tooggleComment === "Latest" ? <Box sx={{height:"110px"}}><Typography variant="h6">Latest Comments comments, <b>this feature is comming soon</b></Typography></Box> : null}
                  
                  </Box>
                </Box>
              </Box>
            </Box>  
          </Box>  
      </Box>
      
      <Box mt={2} sx={{display:{xs:"none",md:"flex"}, justifyContent:"center"}}>
        <LazyLoadImage  src="https://www.thedevelobear.com/img/Microinteractions/facebook-interactions.gif" effect="blur"/>
      </Box>
                  
  </>
  )
};

export default RecipeData;
