import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scences/navbar";
import UserWidget from "scences/widgets/UserWidget";
import MyPostWidget from "scences/widgets/MyPostWidget";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width={"100%"}
        p="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap={"0.5rem"}
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
        </Box>

        {isNonMobileScreens && <Box flexBasis={"26%"}></Box>}
      </Box>
    </Box>
  );
};

export default Home;
