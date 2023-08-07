import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Logo from "components/Logo";
import  Form  from "./Form";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
      
          <Logo />
  
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        m="2rem auto"
        p="2rem"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome, back
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
