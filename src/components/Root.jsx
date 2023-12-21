import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import React from "react";

export const Root = () => {

  return (
    <Box
      backgroundColor="white"
    >
      
      <Navigation />
      <Outlet />
  
    
    </Box>
  );
};