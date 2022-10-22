import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useFirestore from "../hooks/useFirestore";
import Options from "./Options";
import { useLocation } from "react-router-dom";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
];

const ImagesList = ({ auth }) => {
  const { documents } = useFirestore();
  const router = useLocation();

  const albumId = router.pathname.split("/")[2];

  return (
    <ImageList variant="quilted" cols={4} rowHeight={200}>
      {documents.map((item, index) => (
        <ImageListItem
          key={item.id}
          cols={
            pattern[index - Math.floor(index / pattern.length) * pattern.length]
              .cols
          }
          rows={
            pattern[index - Math.floor(index / pattern.length) * pattern.length]
              .rows
          }
          sx={{
            transition: "opacity .1s linear",
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        >
          <Options
            imageId={item.id}
            albumId={albumId}
            imageURL={item.data.imageURL}
            auth={auth}
          />
          <img
            {...srcset(item.data.imageURL, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;
