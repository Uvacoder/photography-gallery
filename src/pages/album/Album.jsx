import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImagesList from "../../components/ImagesList";
import DeleteAlbumModal from "../../components/modals/DeleteAlbumModal";
import ProgressList from "../../components/progress/ProgressList";
import { firestore } from "../../firebase/firebaseClient";
import useFirestore from "../../hooks/useFirestore";

const Album = ({ auth }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState([]);
  const [album, setAlbum] = useState({});
  const fileRef = useRef();
  const router = useLocation();
  const navigate = useNavigate();
  const { deleteUserFiles, deleteDocument } = useFirestore();
  const [loading, setLoading] = useState(false);

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

  const handleDeleteAlbum = async () => {
    try {
      setLoading(true);
      await deleteUserFiles(`albums/${albumId}/gallery`, albumId);
      await deleteDocument("albums", albumId);
      handleClose();
      navigate("/albums");
      setLoading(false);
    } catch (error) {
      console.log("handleDeleteAlbum Error", error);
    }
  };

  useEffect(() => {
    getAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumId]);

  console.log(album);

  return (
    <Container sx={{ paddingBottom: 6 }}>
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
          <Box display="flex" alignItems="center" gap="10px">
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
            <Box>
              <IconButton
                onClick={handleOpen}
                sx={{ bgcolor: "rgba(0,0,0,.2)" }}
              >
                <Delete />
              </IconButton>
              <DeleteAlbumModal
                open={open}
                handleClose={handleClose}
                handleDeleteAlbum={handleDeleteAlbum}
                loading={loading}
              />
            </Box>
          </Box>
        )}
      </Box>

      <ProgressList files={files} albumId={album.id} />

      <ImagesList auth={auth} />
    </Container>
  );
};

export default Album;
