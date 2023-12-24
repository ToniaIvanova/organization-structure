import React, { memo } from "react";
import { Box, Button, styled, CircularProgress } from "@mui/material";

export type SubmitSpinnerButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const SubmitSpinnerButton: React.FC<SubmitSpinnerButtonProps> = memo(
  function SubmitSpinnerButton({ loading, disabled = false, onClick }) {
    return (
      <ButtonBox>
        <Button
          variant="contained"
          type="submit"
          disabled={loading || disabled}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={onClick}
        >
          Submit
        </Button>
        {loading && (
          <SpinnerBox>
            <CircularProgress color="success" />
          </SpinnerBox>
        )}
      </ButtonBox>
    );
  }
);

const ButtonBox = styled(Box)({
  display: "flex",
});

const SpinnerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
}));
