import React from "react";
import {
  Box,
  Grid,
  Modal as MUIModal,
  Backdrop,
  Fade,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import moment from "moment";

const AchievementsModal = ({ openModal, handleCloseModal, achievements }) => {
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
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            <Grid container spacing={2}>
              {achievements === "err" ? (
                <Typography>Game doesn't have achievements</Typography>
              ) : (
                achievements.map((game) => (
                  <Grid item xs={12} key={game.name}>
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: "0 8px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={game.name}
                        image={game.achieved === 1 ? game.icon : game.icongray}
                        sx={{ height: "40px", width: "40px" }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <CardContent>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {game.displayName}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "10px",
                            }}
                          >
                            {game.description}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "10px",
                            }}
                          >
                            {game.percent} players have this achievement
                          </Typography>
                        </CardContent>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                        }}
                      >
                        {game.achieved === 1 ? moment.unix(game.unlocktime).format("MMM DD, YYYY, hh:mm:ss A") : "Not unlocked yet"}
                      </Typography>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Fade>
      </MUIModal>
    </Box>
  );
};

export default AchievementsModal;
