import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { v4 as uuid } from "uuid";
import uploadFileProgress from "../../firebase/uploadFileProgress";
import addDocument from "../../firebase/addDocument";

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

const ProgressItem = ({ file, albumId }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuid() + "." + file.name.split(".").pop();
      try {
        const url = await uploadFileProgress(
          file,
          `gallery/${albumId}`,
          imageName,
          setProgress
        );
        const galleryDoc = {
          imageURL: url,
        };
        await addDocument(`/albums/${albumId}/gallery`, galleryDoc, imageName);
        setImageURL(null);
      } catch (error) {
        console.log("uploadImage Error", error);
      }
    };

    setImageURL(URL.createObjectURL(file));
    uploadImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="" loading="lazy" />
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
    )
  );
};

export default ProgressItem;
