const initialApiKey = {
    apiKey:process.env.REACT_APP_FOOD_API_KEY,
};

const changeAPiKey = (state = initialApiKey, action) =>{
    switch (action.type){
        case "UPDATE_API_KEY":
            return {apiKey:action.payload};
        default:
            return state;
    }
}

export default changeAPiKey;