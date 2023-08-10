import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { EditOutlined } from "@mui/icons-material";

// Form lib
import { Formik } from "formik";

// Validation lib
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";

const GroupSchema = yup.object().shape({
  name: yup.string().required("Group name is required"),
  description: yup.string().required("Group description is required"),
  picture: yup.string().required("Picture is required"),
});

const initialValues = {
  name: "",
  description: "",
  picture: "",
};

const MakeGroupForm = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  const handleSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picture", values.picture.name);
    const savedUserResponse = await fetch(
      "http://localhost:3001/users/" + _id + "/createGroup",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={GroupSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns={"repeat(4,minmax(0,1fr))"}
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            <TextField
              name="name"
              label="Group name"
              variant="outlined"
              fullWidth
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{
                gridColumn: "span 2",
              }}
            />
            <TextField
              name="description"
              label="Group description"
              variant="outlined"
              fullWidth
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helperText={touched.description && errors.description}
              sx={{
                gridColumn: "span 2",
              }}
            />
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&hover:": { color: palette.primary.main },
              }}
            >
              Create group
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default MakeGroupForm;
