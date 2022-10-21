import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid rgba(255, 255 , 255, 0.1)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const CreateAlbumModal = ({
  open,
  handleClose,
  albumName,
  setAlbumName,
  createAlbum,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap="20px"
        >
          <Typography fontSize="23px" fontWeight={600} textAlign="center">
            Create Album
          </Typography>
          <TextField
            variant="outlined"
            label="Album Name"
            fullWidth
            required
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />
          <Button variant="contained" fullWidth onClick={createAlbum}>
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateAlbumModal;
