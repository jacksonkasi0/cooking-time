import React, { useEffect, useState } from "react";
import axios from 'axios'
import Style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import {
  Toolbar,
  Box,
  AppBar,
  Typography,
  Button,
  IconButton,
  Container,
  Drawer,
  Autocomplete,
  TextField,
} from "@mui/material";

import { useSelector,useDispatch} from "react-redux";
import { UpdateRecipeID } from "../../store/action/recipeId";
import { UpdateApiKey } from "../../store/action/updateApi"

import { ApiKeys } from "../../api/ApiKeys"

const pages = ["category", "login", "subscribe"];

const Navbar = () => {

  // get api key id 
  const getApiKey = useSelector((state)=> state.apiKey_Data.apiKey)

  // // dispatch
  const dispatch = useDispatch()

  let apiCallTime = 0;

  const changeAPiKey = () => {// change api key when api limit hit 150 point, then it's throw 402 error

    let CurrentApi = ApiKeys[apiCallTime];
    dispatch(UpdateApiKey(CurrentApi));

    console.log("api limit error & status code = 4️⃣0️⃣2️⃣, but you don't worry, api was changed. so happy cooking 😁")

    apiCallTime++;

    if (apiCallTime > 8) {
      apiCallTime = 0;
    }
  };

  //  toggle Drawer ( Side Menu )
  const [leftMenu, setLeftMenu] = useState({
    left:false
  });

  const toggleDrawer = ( value ,open) => (event)=>  {
    if ( event.type === 'keydown' && (event.key === 'Tab' || event.type === 'Shift' ) ){
      return
    }
    setLeftMenu({ ...leftMenu, [value]: open })
  }

  //
  const [BottomSearch, setBottomSearch] = useState("fa-search");
  const [visible,setVisible] = useState("none")

  // toggle search  and close icon Func at mobile view 
  const toggleBottomSearch = ()=>{
    setBottomSearch((state)=>state ===  "fa-times-circle" ? "fa-search" : "fa-times-circle")
    setVisible((state)=>state === "flex" ? "none" : "flex" )
  }

  // navebar hide & show
  let [navTop,setNavTop] = useState("0px")
      
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function(){
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setNavTop("0px")
    } else {
      setNavTop("-150px")
    }
    prevScrollpos = currentScrollPos;
  }


  // inputbox value
  const [input, setInput] = useState("");
  // get search item info from inputID. using inputID.id
  const [inputID, setInputID] = useState(null);

  const clearBoxIcon = (event)=>{
    if (event.target.value.length <= 0 ){
      // setCloseVisible("none")
      setInput("")
    }
    else{
      // setCloseVisible("flex")
      setInput(event.target.value)
    }
  }

// search function
const searchFunc = ()=>{
  if(input !== "" && input !== null ){
    dispatch(UpdateRecipeID(inputID.id))//update id
  }
  return
}

  const URL = 'https://api.spoonacular.com/recipes/autocomplete?number=6&query=';

  const [navCardTitle, setNavCardTitle] = useState([]);

  const onChangeGetData = async(inputText)=>{
    try{
    const responce = await axios.get(URL+inputText+`&apiKey=${getApiKey}`) 
    setNavCardTitle( responce.data )
  } catch (err) {
    if (err.response) {
      if(err.response.status ){
        changeAPiKey()
      } 
   }
   console.log(err.response.data.message)
}
  }

  // onchange on search box, fire this function
  const NavCards = ()=>{
    if(input !== ""){
      onChangeGetData(input)
    }
    else{
      onChangeGetData(null) // null for remove/hide "NavCard".js Suggestion
    }
  }

  ///////////// side menu component 
  const SideMenu = (value) => (
    <Box
      sx={{ width: 250, textAlign:"center", mt:10 }}
      role="presentation"
      onClick={toggleDrawer(value,false)}
      onKeyDown={toggleDrawer(value,false)}
    >
    {/* Side Menu Buttons */}
        <Button  >
            <Link to="/" style={{textDecoration:"none" }} >
              <Typography variant="h7" fontWeight="600" color="gray" textAlign="center">Home</Typography>
            </Link>
        </Button>
          <br />
        <Button  >
            <Link to="/category" style={{ color:"gray", textDecoration:"none" }} >
              <Typography variant="h7"  fontWeight="600" color="gray" textAlign="center">Category</Typography>
            </Link>
        </Button>
        <br />
        <Button  >
            <Link to="/login" style={{ color:"#f23224", textDecoration:"none" }} >
              <Typography variant="h7"  fontWeight="600" color="gray" textAlign="center">Login</Typography>
            </Link>
        </Button>
        <br />
        <Button  >
        <Typography variant="h7" color="#f23224" fontWeight="600" textAlign="center">Subscribe</Typography>
        </Button>
        <br />
  
    </Box>
  );


  return (
    <AppBar style={{background:"white",  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}} id="myNavbar" >
      <Box  mt={navTop}  >
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          
          {/* Logo */}
          <Typography variant="h4" noWrap fontFamily="Bevan" fontWeight="400" component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} >
          <Link to="/" style={{color:"#f23224", textDecoration:"none" }} >
              Cooking
            </Link>
          </Typography>

          {/* Desktop view Input-Box */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gridColumnGap: "10px", alignItems: "center", ml: "23%", position: "absolute", }} >
            <Autocomplete className={Style.searchBox}  value={inputID}  options={navCardTitle} getOptionLabel={(option)=>option.title}
            onChange={(event,value)=>{setInputID(value)}}
            renderInput={(params)=> <TextField {...params} sx={{mt:"-2px",outline:"none",border:"none"}} placeholder="what would you like to taste?"
            onChange={clearBoxIcon} value={input}  onKeyUp={(e) => e.code === "Enter" ? searchFunc() : NavCards()}/> }
            />
          </Box>

          {/* Desktop view NavBar Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
           {pages.map((page) => (
                <Link to={"/"+page}  key={page} style={{ textDecoration:"none" }}>
                  <Button  sx={{display: "block" }} >
                    <Typography variant="h7" fontWeight="600" sx={{color:"gray", textTransform:"capitalize" }}>{page}</Typography>
                  </Button>
                </Link>
            ))}
          </Box>

          {/* --- xs view --- */}

          {/* Mobile view Menu Bar & Drawer-Func */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>            
            <IconButton size="large" onClick={toggleDrawer("left",true)} style={{ color: "black" }} >
              <i className="fas fa-bars"></i>
            </IconButton>
            <Drawer anchor="left" open={leftMenu["left"]}  onClose={toggleDrawer("left",false)} >
              {SideMenu("left")}
            </Drawer>
          </Box>

          {/* Mobile view Logo */}
          <Typography variant="h5" noWrap fontFamily="Bevan" fontWeight="400" component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} >
            <Link to="/" style={{color:"black", textDecoration:"none" }} >Cooking</Link>
          </Typography>
            
            {/* Mobile view toggle Search and Close Icons */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: "10px" }}>
            <IconButton size="large"  onClick={toggleBottomSearch} >
                <i className={"fas "+BottomSearch} style={{ color: "black", fontSize: "18px" }} ></i>
              </IconButton>
          </Box>

        </Toolbar>
      </Container>

      {/* Mobile view Search-Box  */}
      <Box sx={{display:{xs:visible, md:"none"},}} >
        <Autocomplete className={Style.BottomSearchBox} 
          value={inputID} 
          options={navCardTitle}
          getOptionLabel={(option)=>option.title}
          onChange={(event,value)=>{
            setInputID(value)
          }}
        renderInput={(params)=> <TextField {...params} sx={{mt:"2px",outline:"none",border:"none"}}  placeholder="what would you like to taste?"
        onChange={clearBoxIcon} value={input}  onKeyUp={(e) => e.code === "Enter" ? searchFunc() : NavCards()}/> }
        />
          <Button className={Style.SearchBtn} sx={{ width:"20%", minWidth:"100px",background:"#f23224",color:"white",fontFamily:"Bevan",  }} onClick={searchFunc} >Search</Button>
      </Box>

    </Box>
  </AppBar>
  );
};

export default Navbar;
