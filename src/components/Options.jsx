import { Delete, Download, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import useFirestore from "../hooks/useFirestore";

const Options = ({ imageId, albumId, imageURL, auth }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { deleteDocument, deleteFile } = useFirestore();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await deleteDocument(`albums/${albumId}/gallery`, imageId);
      await deleteFile(`gallery/${albumId}/${imageId}`);
    } catch (error) {
      console.log("handleDelete Error", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageURL);
      const data = await response.blob();
      const blob = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = blob;
      link.download = imageId;
      link.click();
      URL.revokeObjectURL(blob);
      link.remove();
    } catch (error) {
      console.log("handleDownload Error", error);
    }
  };

  return (
    <>
      <Box>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            sx={{
              position: "absolute",
              right: 2,
              top: 2,
              color: "white",
              background: "rgba(0,0,0,.3)",
            }}
          >
            <MoreHoriz />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <Download />
          </ListItemIcon>
          Download
        </MenuItem>
        {auth && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Options;
