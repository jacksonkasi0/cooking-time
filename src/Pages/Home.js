import React from "react";
import { Box,Chip,Divider,TextField,Typography,Button, Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Style from './Home.module.css'
import SwiperCard from "../components/SwiperCard/SwiperCard";
import Cards from "../components/Cards/Cards";

import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux" 
import {UpdateRecipeID} from "../store/action/recipeId"

const Home = ({homeRecipeData}) => {

    const SwiperData =  homeRecipeData.recipes.slice(4,11);
    const CardsData = homeRecipeData.recipes.slice(12,21);
    
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const getID = (event) => { 
        // console.log(event.target.id)
        dispatch(UpdateRecipeID(event.target.id))
        navigate('/recipes', { replace: true })
      };

  return (
    <Box sx={{my:"50px", px:{xs:"2%",md:"5%"},}}>
      <Box  my={2} sx={{display:"flex",flexDirection:{xs:"column",md:"row"}, justifyContent:{xs:"unset",md:"center",lg:"unset"}, alignItems:{xs:"flex-start",md:"unset"}, gridGap:"40px"}} >
        
        <Box sx={{display:"flex", flexDirection:"column", gridGap:"40px"}}  >
            <Box sx={{position:"relative"}}   >
                <Chip label="Today's Recipe" sx={{position:"absolute", top:"20px", left:"20px", bgcolor:"#F23224",color:"#ffff", zIndex:"10"}} id={homeRecipeData.recipes[0].id} onClick={getID}  />
                <LazyLoadImage src={homeRecipeData.recipes[0].image} effect="blur"  className={Style.FRoundedImg} id={homeRecipeData.recipes[0].id} onClick={getID}  />
            </Box>
            <Box sx={{width:{xs:"100%",md:"500px"} }}>
                <Typography variant="h5" mb={1} className={Style.title}  onClick={getID} id={homeRecipeData.recipes[0].id} >{homeRecipeData.recipes[0].title}</Typography>
                <Typography variant="h6" className={Style.Fsummary} dangerouslySetInnerHTML={{__html: [homeRecipeData.recipes[0].summary] }} />
            </Box>
        </Box>

        <Box sx={{display:"flex", flexDirection:"column",alignItems:"center",gridGap:"20px"}} >
          <Box  sx={{display:{xs:"flex"}, flexDirection:{xs:"row",md:"column",lg:"row"}, gridGap:"40px"}} className={Style.SBox} >
            <LazyLoadImage src={homeRecipeData.recipes[1].image} effect="blur" className={Style.SRoundedImg}  id={homeRecipeData.recipes[1].id}  onClick={getID} />
            <Box>
                <Typography variant="h5" mb={1} className={Style.title}  id={homeRecipeData.recipes[1].id}  onClick={getID} >{homeRecipeData.recipes[1].title}</Typography>
                <Typography variant="h6" className={Style.Ssummary} dangerouslySetInnerHTML={{__html: [homeRecipeData.recipes[1].summary] }} />
            </Box>
          </Box>
          <Box sx={{display:{xs:"flex"}, flexDirection:{xs:"row",md:"column",lg:"row"}, gridGap:"40px"}}  className={Style.SBox} > 
            <LazyLoadImage src={homeRecipeData.recipes[2].image} effect="blur" className={Style.SRoundedImg}  id={homeRecipeData.recipes[2].id}  onClick={getID} />
            <Box>
                <Typography variant="h5" mb={1} className={Style.title}  id={homeRecipeData.recipes[2].id}  onClick={getID} >{homeRecipeData.recipes[2].title}</Typography>
                <Typography variant="h6" className={Style.Ssummary} dangerouslySetInnerHTML={{__html: [homeRecipeData.recipes[2].summary] }} />
            </Box>
          </Box>
        </Box>

      </Box>

        <Divider variant="middle" />

        <Box py={2}  >
            <Box sx={{textAlign:"center"}} my={3} >
            <Typography variant="h4" fontWeight="bold" color="#222222"  >What to Cook This Week</Typography>
            <Typography variant="h7" fontWeight="500" >RECIPES, GUIDES AND MORE FOR THE WEEK</Typography>
            </Box>

            <hr style={{height:"7px",backgroundColor:"#222222"}} />

            <Box sx={{textAlign:"start"}} my={3} >
                <Typography variant="h5" fontWeight="bold" color="#222222" >Some Suggestions :)</Typography>
                <Typography variant="h5" fontWeight="500" color="#999999" >Recipes selected throughout the week by Jackson Kasi, food editor of The Cooking Time.</Typography>
            </Box>

            <SwiperCard Data={SwiperData} />

            <Box my={1} sx={{  display:"flex", flexDirection:{xs:"column",md:"row"}, justifyContent:"space-around",alignItems:"center",gridGap:{xs:"10px",md:"20px"} }} minHeight="80px"  >
                <Box sx={{textAlign:{xs:"center",md:"start"}}} >
                    <Typography variant="h6" fontWeight="bold" mb={1} >Get recipes, tips and NYT special offers delivered to your inbox.</Typography>
                    <p style={{color:"gray", width:"90%"}}>Opt out or <a href="#" style={{color:"#000"}} >contact us</a> anytime. See our <a href="#" style={{color:"#000"}} >Privacy Policy</a>.</p>
                </Box>
                <Box sx={{display:"flex", maxWidth:"400px", margin:"20px 0" ,flexDirection:{xs:"column",md:"row"}, gridRowGap:"7px" }}>
                    <TextField   label="Add Your Email" variant="outlined" />
                    <Button variant="contained" color="error" sx={{bgcolor:"#E33D26", color:"white"}} >Sign Up</Button>
                </Box>
            </Box>

            <hr style={{height:"7px",backgroundColor:"#222222"}} />

            <Box sx={{textAlign:"start"}} my={3} >
                <Typography variant="h5" fontWeight="bold" color="#222222" >More From Our Editors</Typography>
                <Typography variant="h5" fontWeight="500" color="#999999" >Weeknight suppers, seasonal favorites and other ideas for this week.</Typography>
            </Box>
            <br />
            <br />
            <br />
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{gridGap:{xs:"1rem",md:"2em"},justifyContent:"center"}} >
                <Cards Data={CardsData} />
            </Grid>


        </Box>
    </Box>
  );
};

export default Home;

