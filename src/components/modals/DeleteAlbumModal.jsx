import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid rgba(255, 255 , 255, 0.1)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

const DeleteAlbumModal = ({
  open,
  handleClose,
  handleDeleteAlbum,
  loading,
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
          gap="10px"
        >
          <Typography fontSize="22px" fontWeight={700}>
            Delete Album
          </Typography>
          <Typography variant="body1" fontSize="16px">
            Are you sure, you want to delete this album?
          </Typography>
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="flex-end"
            gap="10px"
            marginTop="10px"
          >
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{
                bgcolor: "#f80d18",
                color: "white",
                "&:hover": { bgcolor: "rgba(248, 13, 24, 0.7)" },
              }}
              onClick={handleDeleteAlbum}
            >
              Delete
            </LoadingButton>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#c2c2c2",
                color: "#c2c2c2",

                "&:hover": {
                  bgcolor: "rgba(194, 194, 194, 0.1)",
                  borderColor: "#c2c2c2",
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteAlbumModal;
