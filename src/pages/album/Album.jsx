import { Delete, DownloadTwoTone, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [files, setFiles] = useState([]);
  const [album, setAlbum] = useState({});
  const fileRef = useRef();
  const router = useLocation();
  const navigate = useNavigate();
  const { deleteUserFiles, deleteDocument } = useFirestore();
  const [loading, setLoading] = useState(false);
  const { documents } = useFirestore();

  const albumId = router.pathname.split("/")[2];

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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

  const handleDownloadAll = () => {
    try {
      documents.forEach(async (item) => {
        const response = await fetch(item?.data?.imageURL);
        const data = await response.blob();
        const blob = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = blob;
        link.download = item.id;
        link.click();
        URL.revokeObjectURL(blob);
        link.remove();
      });
    } catch (error) {
      console.log("handleDownloadAll Error", error);
    }
  };

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
        <Box display="flex" alignItems="center" gap="10px">
          {auth && (
            <>
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
            </>
          )}
          <Box>
            <Box>
              <Tooltip title="More Options">
                <IconButton onClick={handleClickMenu}>
                  <MoreHoriz />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  bgcolor: "#202020",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {auth && (
                <>
                  <MenuItem onClick={handleOpen}>
                    <ListItemIcon>
                      <Delete />
                    </ListItemIcon>
                    Delete Album
                  </MenuItem>
                  <DeleteAlbumModal
                    open={open}
                    handleClose={handleClose}
                    handleDeleteAlbum={handleDeleteAlbum}
                    loading={loading}
                  />
                </>
              )}
              <MenuItem
                onClick={() => {
                  handleDownloadAll();
                  handleCloseMenu();
                }}
              >
                <ListItemIcon>
                  <DownloadTwoTone />
                </ListItemIcon>
                Download All
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      <ProgressList files={files} albumId={album.id} />

      <ImagesList auth={auth} />
    </Container>
  );
};

export default Album;
