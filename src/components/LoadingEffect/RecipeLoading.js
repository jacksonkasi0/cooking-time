import React from "react";
import {Divider, Skeleton,Stack} from '@mui/material'
import { Box } from "@mui/system";


const RecipeLoading = () => {
  return (
    <Box  marginX={7} marginY={5}  >
      <Stack spacing={1}>
        <Box sx={{display:"flex", justifyContent:"space-between" }} >
            <Box sx={{display:"block",width:"50%" }} >
            <Skeleton variant="text" height={50} />
            <Skeleton variant="text" width="70%" height={50} />
            </Box> 
            <Box sx={{display:"flex", justifyContent:"space-around", paddingTop:"7px"}} width={150} >
                <Skeleton variant="circular" width={35} height={35} />
                <Skeleton variant="circular" width={35} height={35} />
                <Skeleton variant="circular" width={35} height={35} />
            </Box>
        </Box>

        <Box sx={{display:"flex", justifyContent:"space-between", minWidth:"200px", maxWidth:"28%" }} >
        <Skeleton variant="text" width="20%" height={18} />
        <Skeleton variant="text" width="70%" height={18} />
        </Box>
        <br />
        <Divider/>
        <br />
    <Box sx={{ display:"flex"}} >
        <Box sx={{width:"60%"}} >
            <>
            <Box sx={{display:"flex",minWidth:"200px",  maxWidth:"280px", justifyContent:"space-between"}}>
            <Skeleton variant="text"  width="25%" height={18} />
            <Skeleton variant="text" width="70%" height={18} />
            </Box>
            <Box sx={{display:"flex",minWidth:"200px", maxWidth:"280px", justifyContent:"space-between"}}>
            <Skeleton variant="text"  width="25%" height={18} />
            <Skeleton variant="text" width="70%" height={18} />
            </Box>

             <br />   

             <Skeleton variant="text" width="80%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="78%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="80%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="75%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="77%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="80%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="79%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="79%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="76%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="73%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="77%"  height={10} sx={{margin:"8px 0"}} />
             <Skeleton variant="text" width="80%"  height={10} sx={{margin:"8px 0"}} />
            </>
        </Box>

        <Box sx={{width:"38%", paddingTop:"70px"}} >
            <Skeleton variant="rectangular" width="100%"  height={200}  />
        </Box>

    </Box>
      </Stack>
    </Box>
  );
};

export default RecipeLoading;
