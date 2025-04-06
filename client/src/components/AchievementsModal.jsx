import React from "react";
import {
  Box,
  Modal as MUIModal,
  Backdrop,
  Fade,
  Typography,
  Button,
} from "@mui/material";

const AchievementsModal = ({
  openModal,
  handleCloseModal,
  handleOpenModal,
}) => {
  return (
    <Box>
      <MUIModal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "15px",
            }}
          >
            <Typography>HHHH</Typography>
          </Box>
        </Fade>
      </MUIModal>
    </Box>
  );
};

export default AchievementsModal;
