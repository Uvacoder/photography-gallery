import { Box, Button, Container, Input, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import ImagesList from "../../components/ImagesList";
import ProgressList from "../../components/progress/ProgressList";

const Album = ({ auth }) => {
  const [files, setFiles] = useState([]);
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };

  return (
    <Container>
      <Box
        paddingTop="25px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <Typography fontSize="26px" fontWeight={600}>
          Album Name
        </Typography>
        {auth && (
          <Box>
            <Input
              type="file"
              inputProps={{ multiple: true }}
              inputRef={fileRef}
              onChange={handleChange}
              sx={{ display: "none" }}
            />
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={handleClick}
            >
              Upload Images
            </Button>
          </Box>
        )}
      </Box>

      <ProgressList files={files} />

      <ImagesList />
    </Container>
  );
};

export default Album;
