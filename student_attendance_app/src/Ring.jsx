import { React, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import Box from "@mui/material/Box";

export function Ring() {
  const [isLoading, setIsLoading] = useState(true);

  // const loadingCheck = () => {
  //   setIsLoading(true);
  // }
  return (
    <>
      <Box sx={{ display: "flex", zIndex: "100000", textAlign: "center" }}>
        <CircularProgress
          sx={{ color: "black", width: "50px", height: "50px" }}
        />
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      </Box>
    </>
  );
}



// import * as React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';

// export default function Ring() {
//   return <CircularProgress disableShrink />;
// }


// import React from 'react';
// import { ColorRing } from  'react-loader-spinner';

// export function Ring() {
//   return (
//     <ColorRing
//   visible={true}
//   height="80"
//   width="80"
//   zIndex="10000000"
//   ariaLabel="blocks-loading"
//   wrapperStyle={{}}
//   wrapperClass="blocks-wrapper"
//   colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
// />
//   )
// }
