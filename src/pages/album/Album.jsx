import { Box, Button, Container, Input, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ImagesList from "../../components/ImagesList";
import ProgressList from "../../components/progress/ProgressList";
import { firestore } from "../../firebase/firebaseClient";

const Album = ({ auth }) => {
  const [files, setFiles] = useState([]);
  const [album, setAlbum] = useState({});
  const fileRef = useRef();
  const router = useLocation();

  const albumId = router.pathname.split("/")[2];

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };

  console.log(files);

  const getAlbum = async () => {
    try {
      const albumRef = doc(firestore, `albums/${albumId}`);
      const albumDoc = await getDoc(albumRef);
      setAlbum(() => ({ id: albumDoc.id, ...albumDoc.data() }));
    } catch (error) {
      console.log("getAlbum Error", error);
    }
  };

  useEffect(() => {
    getAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumId]);

  console.log(album);

  return (
    <Container>
      <Box
        paddingTop="25px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
      >
        <Typography fontSize="26px" fontWeight={600}>
          {album.title}
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

      <ProgressList files={files} albumId={album.id} />

      <ImagesList auth={auth} />
    </Container>
  );
};

export default Album;
