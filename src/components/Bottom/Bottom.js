import React from 'react';
import Style from "./Bottom.module.css";
import { Avatar, Box, Typography, Button, TextField } from "@mui/material";

import useSound from 'use-sound'
import HoverSound from  '../../assets/sound/rising-pops.mp3'


const BottomCard = () => {
    const [play] = useSound(HoverSound,{volume:0.5})

  return(
    <>
        <Box mt={4} bgcolor="#E6E7E3" color="#000"sx={{display:"flex", padding:"2%", gridGap:"2%" ,flexDirection:{xs:"column",md:"row"}, justifyContent:"space-around"}} >
            <Box sx={{ width:{xs:"100%",md:"60%"}}} minHeight="80px"  >
                <Typography variant="h6" fontWeight="bold" >Get Our Newsletter</Typography>
                <p style={{color:"gray", width:"90%"}}>Get recipes, tips and special offers in your inbox. Opt out or <a href="#" style={{color:"#000"}} >contact us</a> anytime. See our <a href="#" style={{color:"#000"}} >Privacy Policy</a>.</p>
                
                <Box sx={{display:"flex", maxWidth:"400px", margin:"20px 0" ,flexDirection:{xs:"column",md:"row"}, gridRowGap:{xs:"20px",md:"0px"} }}>
                    <TextField   label="Add Your Email" variant="outlined" />
                    <Button variant="contained" color="error" sx={{bgcolor:"#E33D26", color:"white"}} >Sign Up</Button>
                </Box>
            </Box>
            <Box  sx={{   width:{xs:"100%",md:"30%"}}}>
                <Typography variant="h6" fontWeight="bold" >FOLLOW US</Typography>
                <Box >
                    <Box my={1}  sx={{display:"flex", gridGap:"10px",  width:"100%"}}  >
                      <a href="https://github.com/jacksonkasi0" target="_blank" style={{height:"40px", borderRadius:"50%", textDecoration:"none"}} onMouseEnter={() => play()}><Avatar  id={Style.avatarM} className={Style.shareAvatar} sx={{bgcolor:"gray[200]"}} ><i className="fab fa-github" ></i></Avatar></a>
                      <a href="https://www.instagram.com/jacksonkasi555" target="_blank" style={{height:"40px", borderRadius:"50%", textDecoration:"none"}} onMouseEnter={() => play()}><Avatar id={Style.avatarP} className={Style.shareAvatar} sx={{bgcolor:"#ff1744"}} ><i className="fab fa-instagram"></i></Avatar></a>
                      <a href="https://dev.to/jacksonkasi" target="_blank" style={{textDecoration:"none"}} onMouseEnter={() => play()}><Avatar id={Style.avatarF} className={Style.shareAvatar} sx={{bgcolor:"#000"}} ><i className="fab fa-dev"></i></Avatar></a>
                      <a href="https://warren-buffett-tamil.quora.com" target="_blank" style={{height:"40px", borderRadius:"50%", textDecoration:"none"}} onMouseEnter={() => play()}><Avatar id={Style.avatarP} className={Style.shareAvatar} sx={{bgcolor:"red"}} ><i className="fab fa-quora"></i></Avatar></a>
                      <a href="https://www.linkedin.com/in/jackson-kasi-6217541b8/" target="_blank" style={{height:"40px", borderRadius:"50%", textDecoration:"none"}} onMouseEnter={() => play()}><Avatar id={Style.avatarF} className={Style.shareAvatar} sx={{bgcolor:"#004182"}} ><i className="fab fa-linkedin"></i></Avatar></a>
                    </Box>
                      <Box mb={1} sx={{ display:"flex", pt:"10px",gridGap:"10px", width:"100%" }} >
                        <Button className={Style.appBtn} ><i className="fab fa-apple fa-lg"></i>&emsp;<p>App Store</p></Button>
                        <Button className={Style.appBtn} ><i className="fab fa-google-play fa-lg"></i>&emsp;<p>Play Store</p></Button>
                      </Box>
                </Box>
                <a href="https://dev.to/jacksonkasi/cook-react-with-spoonacular-api-how-to-hack-api-5cj7" target="_blank" style={{textDecoration:"none"}} onMouseEnter={() => play()}>
                <Button Button className={Style.appBtn} ><i class="fas fa-blog"></i>&emsp;<p>Blog</p></Button>
                </a>
            </Box>
            </Box>

            <Box bgcolor="#000" color="#ffff" sx={{display:"flex", flexDirection:"column", gridGap:"4%", padding:"4%", alignItems:"center",overflow:"hidden", }}>
            <Box>
            <Typography my={2} variant="h6" fontWeight="bolder" >Design Inspiration from <a href="https://cooking.nytimes.com" style={{color:"ghostwhite"}}>nytimes</a></Typography>
            <Typography my={2} variant="h6" fontWeight="bold" color="#E33D26" >Upcoming Features:</Typography>

            <Box sx={{ml:{xs:"15px",md:"50px"}, width:{xs:"100%",md:"500px"} }}  >
              <Typography my={1} variant="h6">Multiple Authenticator with <b>Firebase</b></Typography>
              <Typography my={1} variant="h6">Sending weekly <b>Trending Cooking</b> Email</Typography>
              <Typography my={1} variant="h6">Save Cooking</Typography>
              <Typography my={1} variant="h6">Give Rating</Typography>
              <Typography my={1} variant="h6">Share Cooking <b>Recipe link</b></Typography>
              <Typography my={1} variant="h6">Add Comments, that function like youtube or any other social media comment's feature!</Typography>
              <Typography my={1} variant="h6">User Dashboard, and also some feature</Typography>
            </Box>
            <br />

            <Typography my={2} variant="h6" fontWeight="bold" color="#E33D26" >Final Features:</Typography>
            <Box sx={{ml:{xs:"15px",md:"50px"}, width:{xs:"100%",md:"500px"}}}  >
              <Typography my={1} variant="h6">Create new website, like this, but now we don't use <b>spoonacular api</b></Typography>
              <Typography my={1} variant="h6">this time we create our own <b> CMS/Blog Sytem</b></Typography>
              <Typography my={1} variant="h6">Build api link using <b>Graphql</b></Typography>
              <Typography my={1} variant="h6">Data Base using <b>MongoDB</b></Typography>
              <Typography my={1} variant="h6">Admin page like as <b>Facebook Studio</b></Typography>
            </Box>

            <br />
            <br />
            <Typography my={2} variant="h6" fontWeight="400" >Features are Coming Soon😁😁😁</Typography>            
            <br />
            <Typography my={2} variant="h6" fontWeight="500" >By 💖 with <a href="https://dev.to/jacksonkasi" target="_blank" style={{textDecoration:"none",color:"#249BE3"}}>@Jackson Kasi</a></Typography>

            </Box>

        </Box>
    </>)
};

export default BottomCard;
