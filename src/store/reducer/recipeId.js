const initialValue = {
  recipeID: "",
};

const changeRecipe = (state = initialValue, action) => {
  switch (action.type) {
    case "UPDATE_RECIPE_ID":
      return { recipeID: action.payload };
    default:
      return state;
  }
};


export default changeRecipe;
