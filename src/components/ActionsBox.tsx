import React from "react";
import { Box, Button, Typography } from "@mui/material";

type ActionsBoxProps = {
  setIsDrawerOpen: (isOpen: boolean) => void;
  onAssignManager: () => void;
  isChangeManagerButton?: boolean;
  isChangeManagerHelper?: boolean;
};

export const ActionsBox: React.FC<ActionsBoxProps> = ({
  setIsDrawerOpen,
  onAssignManager,
  isChangeManagerButton = false,
  isChangeManagerHelper = false,
}) => {
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "inline-flex",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => setIsDrawerOpen(true)}
        sx={{ color: "white", borderColor: "white", width: "250px" }}
      >
        Add user
      </Button>
      {isChangeManagerButton && (
        <Button
          variant="outlined"
          onClick={onAssignManager}
          sx={{ marginTop: "10px", color: "white", borderColor: "white" }}
        >
          Change Manager
        </Button>
      )}
      {isChangeManagerHelper && (
        <Typography
          variant="body1"
          onClick={onAssignManager}
          sx={{ marginTop: "10px", color: "white" }}
        >
          Choose user to become a manager
        </Typography>
      )}
    </Box>
  );
};
