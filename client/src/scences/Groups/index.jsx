import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scences/navbar";
import FriendListWidget from "scences/widgets/FriendListWidget";
import MyPostWidget from "scences/widgets/MyPostWidget";
import PostsWidget from "scences/widgets/PostsWidget";
import UserWidget from "scences/widgets/UserWidget";
const Group = () => {
  const [users, setUsers] = useState(null);
  const { groupId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUsers = async () => {
    const response = await fetch(`http://localhost:3001/groups/${groupId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!users) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* <UserWidget userId={userId} picturePath={user.picturePath} /> */}
          <Box m="2rem 0" />
          {/* <FriendListWidget userId={userId} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={user.picturePath} /> */}
          <Box m="2rem 0" />
          <PostsWidget userId={groupId} isGroup />
        </Box>
      </Box>
    </Box>
  );
};

export default Group;
