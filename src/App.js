import React,{useEffect, useState} from "react";
import axios from 'axios'
import Navbar from "./components/Navbar/Navbar";
import {  useNavigate  } from "react-router-dom";
// import Style from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import RecipeData from "./Pages/RecipeData";

import { UpdateApiKey } from "./store/action/updateApi";

// pages
import Category from "./Pages/Category";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import RecipeLoading from "./components/LoadingEffect/RecipeLoading";
import Bottom from "./components/Bottom/Bottom";

// import Snakprovider from notiStack, it's help to limit snackbar
import { SnackbarProvider } from "notistack"

// import api key Array
import {ApiKeys} from './api/ApiKeys'

// some api url
const homeRecipeURL = "https://api.spoonacular.com/recipes/random?number=21";
const RecipeURL = 'https://api.spoonacular.com/recipes/';
const SimilarRecipeURL = 'https://api.spoonacular.com/recipes/'


const App = () => {  
  
  // get api key id 
  const getApiKey = useSelector((state)=> state.apiKey_Data.apiKey)

  // get recipe id 
  const getRecipeId = useSelector((state)=> state.recipeId_Data.recipeID)

  let apiCallTime = 0;
  const dispatch = useDispatch();

  const changeAPiKey = () => {// change api key when api limit hit 150 point, then it's throw 402 error

    let CurrentApi = ApiKeys[apiCallTime];
    dispatch(UpdateApiKey(CurrentApi));

    console.log("api limit error & status code = 4️⃣0️⃣2️⃣, but you don't worry, api was changed. so happy cooking 😁")

    apiCallTime++;

    if (apiCallTime > 8) {
      apiCallTime = 0;
    }
  };
  

  // Home Page
  const [homeRecipeData,setHomeRecipeData] = React.useState([]);
  const [home,setHome] = React.useState(false);   

  useEffect( () => { 
      async function fetchData() {
          try {
              const apiResponse =  await axios.get(homeRecipeURL+`&apiKey=${getApiKey}`);
              const homeRecipeData = await apiResponse.data;
              setHomeRecipeData(homeRecipeData);
              setHome(true)
          } catch (err) {
                if (err.response) {
                  if(err.response.status ){
                    changeAPiKey()
                  } 
               }
               console.log(err.response.data.message)
            }
      }
      fetchData();
  }, [getApiKey]);


  // Reacipe Page
  let navigate = useNavigate();

  const [recipesInfo, setRecipesInfo] = useState("");
  const [similarRecipe, setSimilarRecipe] = useState([]);
  const [show, setShow] = useState(false); // this is for Loading Effect
  
  const GetDataFunction = async(recipeId)=>{
      try{

        if(recipeId==="") return;
        navigate('/recipes', { replace: true }) // this is redirect you at "/recipes"

        const recipeResponce = await axios.get(RecipeURL+recipeId+`/information?&apiKey=${getApiKey}`);
        
        recipeResponce && await setRecipesInfo(recipeResponce.data)

        const similarRecipeResponce = await axios.get(SimilarRecipeURL+recipeId+`/similar?&apiKey=${getApiKey}`);

        similarRecipeResponce && await setSimilarRecipe(similarRecipeResponce.data)

        await setShow(true)// "setShow(true)" for Loading Effect
    }
    catch(err){
      if (err.response) {
        if(err.response.status ){
          changeAPiKey()
        } 
     }
     console.log(err.response.data.message);
    }
  }
  

    useEffect(() => { 
      setShow(false)  // "setShow(false)"" for Loading Effect
      GetDataFunction(getRecipeId) 
    }, [getRecipeId] );

    return (
    <SnackbarProvider maxSnack={3} >
      <Navbar />
      <br/>
      <br/>
      <br/>
      <Routes>
        <Route path="/" element={ home? <Home homeRecipeData={homeRecipeData} /> : <RecipeLoading/> } />
        <Route path="/recipes" element={ show? <RecipeData recipesInfo={recipesInfo} similarRecipe={similarRecipe}/>: <RecipeLoading/> } />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Bottom/>     
    </SnackbarProvider>
  );
};

export default App;
