import { ImageList } from "@mui/material";
import React from "react";
import ProgressItem from "./ProgressItem";

const ProgressList = ({ files }) => {
  return (
    <ImageList rowHeight={200} cols={4}>
      {files.map((file, i) => (
        <ProgressItem key={i} file={file} />
      ))}
    </ImageList>
  );
};

export default ProgressList;
