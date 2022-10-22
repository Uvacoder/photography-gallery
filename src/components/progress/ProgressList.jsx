import { ImageList } from "@mui/material";
import React from "react";
import ProgressItem from "./ProgressItem";

const ProgressList = ({ files, albumId }) => {
  return (
    <ImageList rowHeight={200} cols={4}>
      {files.map((file, i) => (
        <ProgressItem file={file} albumId={albumId} key={i} />
      ))}
    </ImageList>
  );
};

export default ProgressList;
