import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "components/Modal";
import MakeGroupForm from "components/MakeGroupForm";
const UserWidget = ({ userId, picturePath }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    occupation,
    impressions,
    viewedProfile,
    friends,
  } = user;

  return (
    <>
      <Modal
        open={openEdit}
        handleOpen={handleOpenEdit}
        handleClose={handleCloseEdit}
      >
        <MakeGroupForm onClose={handleCloseEdit} />
      </Modal>
      <WidgetWrapper>
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>

        <Divider />

        <Box p="1rem 0">
          <Box display="flex" alignItems={"center"} gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography variant="h5" color={medium} fontWeight="500">
              {location}
            </Typography>
          </Box>
          <Box display="flex" alignItems={"center"} gap="1rem" mb="0.5rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography variant="h5" color={medium} fontWeight="500">
              {occupation}
            </Typography>
          </Box>
        </Box>

        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight={"500"}>
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>impressions</Typography>
            <Typography color={main} fontWeight={"500"}>
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>

        <Divider />

        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight={"500"} mb="1rem">
            Social profiles
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../assets/twitter.png" alt="" />
              <Box>
                <Typography color={main} fontWeight={"500"}>
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../assets/linkedin.png" alt="" />
              <Box>
                <Typography color={main} fontWeight={"500"}>
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>

          <Button
            onClick={() => setOpenEdit(true)}
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
          >
            Create a group
          </Button>
        </Box>
      </WidgetWrapper>
    </>
  );
};

export default UserWidget;
