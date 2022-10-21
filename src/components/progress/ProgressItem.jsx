import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React, { useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0, .5)",
};

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(100);

  return (
    <ImageListItem cols={1} rows={1}>
      <img
        src="https://images.unsplash.com/photo-1522770179533-24471fcdba45"
        alt=""
      />
      <Box sx={backDrop}>
        {progress < 100 ? (
          <CircularProgressWithLabel value={progress} />
        ) : (
          <CheckCircleOutline
            sx={{ width: 60, height: 60, color: "lightgreen" }}
          />
        )}
      </Box>
    </ImageListItem>
  );
};

export default ProgressItem;
