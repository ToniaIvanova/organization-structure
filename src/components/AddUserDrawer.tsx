import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useFeedError, useFeedSuccess } from "../utils/feedHooks";
import { addUser } from "@/api";
import { useRouter } from "next/router";
import { ErrorType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledTextField } from "./ControlledTextField";
import { SubmitSpinnerButton } from "./SubmitSpinnerButton";

export const addUserFormSchema = yup.object({
  name: yup
    .string()
    .required("This field should not be empty")
    .min(2, "Name should be longer than 2 letters")
    .max(256, "Name should be shorter than 256 letters"),
});

type AddUserDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const AddUserDrawer: React.FC<AddUserDrawerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const feedError = useFeedError();
  const feedSuccess = useFeedSuccess();
  const router = useRouter();
  const formMethods = useForm<{ name: string }>({
    resolver: yupResolver(addUserFormSchema),
    mode: "all",
  });
  const { handleSubmit, control } = formMethods;

  async function onAddUser({ name }: { name: string }) {
    setLoading(true);
    try {
      await addUser(name);
      feedSuccess("User have been successfully added.");
      router.reload();
    } catch (error: unknown) {
      if ((error as ErrorType)?.message) {
        feedError((error as ErrorType)?.message);
      }
      if (typeof error === "string") {
        feedError(error);
      }
    }
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  return (
    <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
      <StyledBox role="presentation">
        <Typography variant="h5">New User</Typography>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            paddingTop: "35px",
          }}
        >
          <CssBaseline />
          <FormProvider {...formMethods}>
            <Grid
              container
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={2}
            >
              <Grid item gridColumn="span 12">
                <ControlledTextField
                  control={control}
                  name="name"
                  label={"Full name *"}
                  defaultValue={""}
                />
              </Grid>
            </Grid>
          </FormProvider>
          <SubmitSpinnerButton
            loading={loading}
            onClick={handleSubmit(onAddUser)}
          />
        </Container>
      </StyledBox>
    </Drawer>
  );
};

const StyledBox = styled(Box)({
  width: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "30px",
});
